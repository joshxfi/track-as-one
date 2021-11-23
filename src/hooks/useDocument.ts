import {
  DocumentData,
  DocumentReference,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { useState, useEffect, useCallback } from 'react';

/**
 *
 * @param ref document reference
 * @param listen if true, onSnapshot will be used, else getDoc
 * @returns [document, loading]
 */

const useDocument = <T extends unknown>(
  ref: DocumentReference<DocumentData>,
  listen?: boolean
) => {
  const [document, setDocument] = useState<T>({} as T);
  const [loading, setLoading] = useState(false);

  const getDocument = useCallback(async () => {
    setLoading(true);
    const doc = await getDoc(ref);
    setDocument({ ...doc.data(), id: doc.id } as T);

    setLoading(false);
  }, []);

  useEffect(() => {
    let unsub: any;

    if (listen) {
      setLoading(true);

      unsub = onSnapshot(ref, (doc) => {
        setDocument({ ...doc.data(), id: doc.id } as T);
        setLoading(false);
      });
    } else getDocument();

    return unsub;
  }, []);

  return [document, loading] as const;
};

export default useDocument;
