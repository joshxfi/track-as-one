import { db } from '@/config/firebase';
import { useCollection } from '@/hooks';
import { collection, query, where } from 'firebase/firestore';

const useCreatedRooms = (id?: string, listen?: boolean) => {
  const [createdRooms, loading] = useCollection<IRoom>(
    query(collection(db, 'rooms'), where('creator', '==', id ?? '')),
    { deps: [id], listen }
  );

  return [createdRooms, loading] as const;
};

export default useCreatedRooms;
