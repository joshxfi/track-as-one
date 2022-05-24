import React from 'react';
import { collection, query, where } from 'firebase/firestore';

import { useCol } from '@/hooks';
import { db } from '@/config/firebase';
import { useCreatedRooms } from '@/services';
import { defaultPic } from '@/utils/constants';
import { useAuth } from '@/contexts/AuthContext';
import { MyRooms, UserMenu } from '@/components/Home';
import { Badges, ImageFill, Indicator, Layout } from '@/components';

const Homepage: React.FC = () => {
  const {
    data: { username, photoURL, userTag, roles, invites },
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
      className='flex flex-col justify-between py-16 lg:flex-row lg:space-x-40'
    >
      <div className='flex flex-col items-center space-y-4'>
        <ImageFill
          src={photoURL ?? defaultPic}
          className='h-[150px] w-[150px] rounded-full'
          alt='profile picture'
        />

        <div className='relative inline-block'>
          <h1 className='text-2xl font-semibold'>{username}</h1>
          <Badges roles={roles} />
        </div>

        <div className='border-btn-parent group w-[180px]'>
          <div className='relative'>
            <UserMenu />
            {invites?.length > 0 && (
              <Indicator className=' absolute -top-[3px] right-0 rounded-full bg-red-500 p-[3px]' />
            )}
          </div>
        </div>
      </div>

      <div className='mt-12 w-full lg:mt-0'>
        <MyRooms
          createdRooms={createdRooms}
          joinedRooms={[...(joinedRooms ?? []), ...(joinedRoomsAsAdmin ?? [])]}
        />
      </div>
    </Layout>
  );
};

export default Homepage;
