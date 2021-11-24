import { db } from '@/config/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from '.';

/**
 *
 * @param id of the room
 * @returns [room, loading]
 */

const useRoom = (id: any) => {
  const [room, loading] = useDocument<IRoom>(doc(db, `rooms/${id}`));
  return [room, loading] as const;
};

export default useRoom;
