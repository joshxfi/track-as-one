import { DocumentData, getDocs, onSnapshot, Query } from 'firebase/firestore';
import { useState, useEffect } from 'react';

/**
 *
 * @param ref Query<DocumentData>
 * @returns [collection, loading]
 */

const useCollection = <T extends unknown>(
  ref: Query<DocumentData>,
  listener?: { listen: true }
) => {
  const [collection, setCollection] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const getCollection = async () => {
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
  };

  useEffect(() => {
    let unsub: any;

    if (listener) {
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
  }, []);

  return [collection, loading] as const;
};

export default useCollection;
