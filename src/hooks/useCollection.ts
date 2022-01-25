import { useState, useEffect, useCallback } from 'react';
import { DocumentData, getDocs, onSnapshot, Query } from 'firebase/firestore';

interface Options {
  listen?: boolean;
  deps?: any[];
}

/**
 *
 * @param ref collection reference
 * @param listen if true, onSnapshot will be used, else getDocs
 * @returns [collection, loading]
 */

const useCollection = <T extends unknown>(
  ref: Query<DocumentData>,
  options?: Options
) => {
  const [collection, setCollection] = useState<T[]>([]);
  const [_loading, setLoading] = useState(false);

  const _deps = options?.deps;

  const getCollection = useCallback(async () => {
    setLoading(true);

    const docs = await getDocs(ref);

    setCollection(() => {
      const data: T[] = [];

      docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id } as T);
      });

      return data;
    });

    setLoading(false);
  }, [ref]);

  useEffect(() => {
    let unsub: any;

    if (options?.listen) {
      setLoading(true);

      unsub = onSnapshot(ref, (docs) => {
        setCollection(() => {
          const data: T[] = [];

          docs.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id } as T);
          });

          return data;
        });

        setLoading(false);
      });
    } else getCollection();

    return unsub;
  }, [...(_deps ?? [])]);

  return [collection, _loading] as const;
};

export default useCollection;
