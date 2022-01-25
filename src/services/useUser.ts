import { doc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import useDocument from '../hooks/useDocument';

const useUser = (id?: string, listen?: boolean) => {
  const [user, loading] = useDocument<IUser>(doc(db, `users/${id}`), {
    listen: listen ?? false,
    deps: [id],
  });

  return [user, loading] as const;
};

export default useUser;
