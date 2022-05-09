import React from 'react';
import { collection, query, where } from 'firebase/firestore';

import { useCol } from '@/hooks';
import { db } from '@/config/firebase';
import { useCreatedRooms } from '@/services';
import { defaultPic } from '@/utils/constants';
import { useAuth } from '@/contexts/AuthContext';
import { MyRooms, UserMenu } from '@/components/Home';
import { Badges, ImageFill, Layout } from '@/components';

const Homepage: React.FC = () => {
  const {
    data: { username, photoURL, userTag, roles },
  } = useAuth();
  const [createdRooms, crLoading] = useCreatedRooms(userTag);
  const [joinedRooms, jrLoading] = useCol<IRoom>(
    query(
      collection(db, 'rooms'),
      where('members', 'array-contains', userTag ?? '')
    )
  );
  const [joinedRoomsAsAdmin, jraLoading] = useCol<IRoom>(
    query(
      collection(db, 'rooms'),
      where('admin', 'array-contains', userTag ?? '')
    )
  );

  return (
    <Layout
      wide
      loaders={[crLoading, jrLoading, jraLoading]}
      className='flex justify-between space-x-40 pt-16'
    >
      <div className='flex flex-col items-center space-y-4'>
        <div className='relative'>
          <ImageFill
            src={photoURL ?? defaultPic}
            className='h-[150px] w-[150px] rounded-full'
            alt='profile picture'
          />
          <div className='absolute top-0 right-0'>
            <UserMenu />
          </div>
        </div>

        <div className='relative inline-block'>
          <h1 className='text-2xl font-semibold'>{username}</h1>
          <Badges roles={roles} />
        </div>
      </div>

      <div className='w-full'>
        <MyRooms
          createdRooms={createdRooms}
          joinedRooms={[...(joinedRooms ?? []), ...(joinedRoomsAsAdmin ?? [])]}
        />
      </div>
    </Layout>
  );
};

export default Homepage;
