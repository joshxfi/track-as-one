import { db } from '@/config/firebase';
import { doc } from 'firebase/firestore';
import { useDoc } from '../hooks';

/**
 *
 * @param id of the room
 * @returns [room, loading, error]
 */

const useRoom = (id: string | string[] | undefined) => {
  const [room, loading, error] = useDoc<IRoom>(doc(db, `rooms/${id}`));
  return [room, loading, error] as const;
};

export default useRoom;
