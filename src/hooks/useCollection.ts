import { useAuth } from '@/context/AuthContext';
import { DocumentData, getDocs, onSnapshot, Query } from 'firebase/firestore';
import { useState, useEffect, useCallback, useMemo } from 'react';

interface Options {
  listen?: boolean;
  repull?: boolean;
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
  const { loading } = useAuth();

  const [collection, setCollection] = useState<T[]>([]);
  const [_loading, setLoading] = useState(false);

  const _deps = options?.deps;

  const deps = useMemo(() => {
    if (options?.repull) return [...(_deps ?? []), loading];
    return [...(_deps ?? [])];
  }, [_deps, loading]);

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
  }, [...deps]);

  return [collection, _loading] as const;
};

export default useCollection;
