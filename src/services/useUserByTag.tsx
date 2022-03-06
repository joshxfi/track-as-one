import { useCol } from '@/hooks';
import { db } from '@/config/firebase';
import { collection, query, where } from 'firebase/firestore';

const useUserByTag = (userTag: string) => {
  const [_member, loading, error] = useCol<IUser>(
    query(collection(db, 'users'), where('userTag', '==', userTag))
  );

  const member: IUser = _member ? _member[0] : ({} as IUser);
  return [member, loading, error] as const;
};

export default useUserByTag;
