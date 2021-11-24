import { DocumentData, getDocs, onSnapshot, Query } from 'firebase/firestore';
import { useState, useEffect, useCallback } from 'react';

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
  const [loading, setLoading] = useState(false);

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
  }, [...(options?.deps ?? [])]);

  return [collection, loading] as const;
};

export default useCollection;
