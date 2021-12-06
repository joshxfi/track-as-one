import { useAuth } from '@/context/AuthContext';
import {
  DocumentData,
  DocumentReference,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { useState, useEffect, useCallback, useMemo } from 'react';

interface Options {
  listen?: boolean;
  repull?: boolean;
  deps?: any[];
}

/**
 *
 * @param ref document reference
 * @param listen if true, onSnapshot will be used, else getDoc
 * @returns [document, loading]
 */

const useDocument = <T extends unknown>(
  ref: DocumentReference<DocumentData>,
  options?: Options
) => {
  const { loading } = useAuth();

  const [document, setDocument] = useState<T>({} as T);
  const [_loading, setLoading] = useState(false);

  const _deps = options?.deps;

  const deps = useMemo(() => {
    if (options?.repull) return [...(_deps ?? []), loading];
    return [...(_deps ?? [])];
  }, [_deps, loading]);

  const getDocument = useCallback(async () => {
    setLoading(true);
    const doc = await getDoc(ref);
    setDocument({ ...doc.data(), id: doc.id } as T);

    setLoading(false);
  }, [ref]);

  useEffect(() => {
    let unsub: any;

    if (options?.listen) {
      setLoading(true);

      unsub = onSnapshot(ref, (doc) => {
        setDocument({ ...doc.data(), id: doc.id } as T);
        setLoading(false);
      });
    } else getDocument();

    return unsub;
  }, [...deps]);

  return [document, _loading] as const;
};

export default useDocument;
