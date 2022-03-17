import { useCol } from '@/hooks';
import { db } from '@/config/firebase';
import { collection, query, where } from 'firebase/firestore';

const useUserByTag = (userTag?: string) => {
  const [_member, loading, error] = userTag
    ? useCol<IUser>(
        query(collection(db, 'users'), where('userTag', '==', userTag))
      )
    : [null, false, null];

  const member = _member ? _member[0] : null;
  return [member, loading, error] as const;
};

export default useUserByTag;
