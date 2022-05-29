import React from 'react';
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
      className='max-w-screen-sm'
      loaders={[crLoading, jrLoading, jraLoading]}
    >
      <section className='flex flex-col justify-between pt-10 pb-20 md:py-16'>
        <div className='flex flex-col items-center space-y-4'>
          <ImageFill
            src={photoURL || defaultPic}
            className='h-[120px] w-[120px] rounded-full'
            alt='profile picture'
          />

          <div className='relative inline-block'>
            <h1 className='text-2xl font-semibold'>{username}</h1>
            <Badges roles={roles} />
          </div>
        </div>

        <div className='mt-12 w-full'>
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
