import { db } from '@/config/firebase';
import { useCol } from '@/hooks';
import { collection, query, where } from 'firebase/firestore';

const useCreatedRooms = (id?: string) => {
  const [createdRooms, loading, error] = useCol<IRoom>(
    query(collection(db, 'rooms'), where('creator', '==', id ?? ''))
  );

  return [createdRooms, loading, error] as const;
};

export default useCreatedRooms;
