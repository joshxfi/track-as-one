import React from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { BsEye } from 'react-icons/bs';

import { db } from '@/config/firebase';
import { useCollection } from '@/hooks';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { Layout, Header, Loader } from '@/components';
import { ListRooms, NoRooms } from '@/components/Room';

const List = () => {
  const { push } = useRouter();
  const { data } = useAuth();

  const roomRef = collection(db, 'rooms');

  const [createdRooms, loading] = useCollection<IRoom>(
    query(roomRef, where('creator', '==', data.userTag))
  );
  const [joinedRooms, _loading] = useCollection<IRoom>(
    query(roomRef, where('members', 'array-contains', data.userTag))
  );

  const isLoading = loading || _loading;

  return (
    <Layout>
      <Header title='My Rooms' />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='w-full mb-4'>
            <div className='w-full bg-secondary text-primary text-center mb-2 rounded-lg py-1 text-sm'>
              <h2>rooms created {createdRooms?.length}/3</h2>
            </div>

            {createdRooms?.length ? (
              createdRooms?.map((room) => (
                <ListRooms key={room.id} room={room} />
              ))
            ) : (
              <NoRooms desc='Create a Room' href='/create' />
            )}

            <div className='w-full bg-secondary text-primary text-center my-2 rounded-lg py-1 text-sm'>
              <h2>rooms joined {joinedRooms?.length}/∞</h2>
            </div>

            {joinedRooms?.length ? (
              joinedRooms?.map((room) => (
                <ListRooms key={room.id} room={room} />
              ))
            ) : (
              <NoRooms desc='Join a Room' href='/join' />
            )}
          </div>

          <Button
            name='view invites'
            onClick={() => push('/invites')}
            className='btn btn-effect'
            iconStyles='text-secondary text-xl'
            Icon={BsEye}
          />
        </>
      )}
    </Layout>
  );
};

export default List;
