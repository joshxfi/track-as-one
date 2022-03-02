import { doc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useDoc } from '@/hooks';

const useUser = (id?: string) => {
  const [user, loading] = useDoc<IUser>(doc(db, `users/${id}`));

  return [user, loading] as const;
};

export default useUser;
