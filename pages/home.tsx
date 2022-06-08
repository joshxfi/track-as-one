import React from 'react';
import toast from 'react-hot-toast';
import { collection, query, where } from 'firebase/firestore';

import { useCol } from '@/hooks';
import { db } from '@/config/firebase';
import { MyRooms } from '@/components/Home';
import { useCreatedRooms } from '@/services';
import { defaultPic } from '@/utils/constants';
import { useAuth } from '@/contexts/AuthContext';
import { Badges, ImageFill, Layout } from '@/components';

const Homepage: React.FC = () => {
  const {
    data: { username, photoURL, userTag, roles },
  } = useAuth();
  const [createdRooms, cLoading] = useCreatedRooms(userTag);
  const [joinedRooms, jLoading] = useCol<IRoom>(
    query(
      collection(db, 'rooms'),
      where('members', 'array-contains', userTag ?? '')
    )
  );
  const [joinedRoomsAsAdmin, aLoading] = useCol<IRoom>(
    query(
      collection(db, 'rooms'),
      where('admin', 'array-contains', userTag ?? '')
    )
  );

  const copyTag = () => {
    navigator.clipboard.writeText(userTag ?? '');
    toast.success('copied to clipboard');
  };

  return (
    <Layout loaders={[cLoading, jLoading, aLoading]}>
      <section className='flex flex-col justify-between pt-10 pb-20'>
        <div className='flex flex-col items-center'>
          <div className='primary-gradient mb-4 rounded-full p-2'>
            <ImageFill
              src={photoURL || defaultPic}
              className='h-[120px] w-[120px] rounded-full'
              alt='profile picture'
            />
          </div>

          <div className='relative'>
            <h1 className='text-2xl font-semibold'>{username}</h1>
            <Badges roles={roles} />
          </div>
          <button type='button' onClick={copyTag}>
            {userTag}
          </button>
        </div>

        <div className='mt-10 w-full'>
          <MyRooms
            createdRooms={createdRooms}
            joinedRooms={[
              ...(joinedRooms ?? []),
              ...(joinedRoomsAsAdmin ?? []),
            ]}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Homepage;
