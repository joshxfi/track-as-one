import { DocumentData, DocumentReference, Query } from 'firebase/firestore';
import {
  useCollection,
  useCollectionOnce,
  useDocument,
  useDocumentOnce,
} from 'react-firebase-hooks/firestore';

export const useCol = <T extends unknown>(ref: Query<DocumentData>) => {
  const [value, loading, error] = useCollection(ref);
  const collection = value?.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as T)
  );

  return [collection, loading, error] as const;
};

export const useColOnce = <T extends unknown>(ref: Query<DocumentData>) => {
  const [value, loading, error] = useCollectionOnce(ref);
  const collection = value?.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as T)
  );

  return [collection, loading, error] as const;
};

export const useDoc = <T extends unknown>(
  ref: DocumentReference<DocumentData>
) => {
  const [value, loading, error] = useDocument(ref);
  const document = { ...value?.data(), id: value?.id } as T;

  return [document, loading, error] as const;
};

export const useDocOnce = <T extends unknown>(
  ref: DocumentReference<DocumentData>
) => {
  const [value, loading, error] = useDocumentOnce(ref);
  const document = { ...value?.data(), id: value?.id } as T;

  return [document, loading, error] as const;
};
