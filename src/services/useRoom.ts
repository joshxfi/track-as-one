import { db } from '@/config/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from '../hooks';

/**
 *
 * @param id of the room
 * @returns [room, loading]
 */

const useRoom = (id: string | string[] | undefined, listen?: boolean) => {
  const [room, loading] = useDocument<IRoom>(doc(db, `rooms/${id}`), {
    listen,
  });
  return [room, loading] as const;
};

export default useRoom;
