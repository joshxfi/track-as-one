import React from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { BsEye } from 'react-icons/bs';

import { db } from '@/config/firebase';
import { useCollection } from '@/hooks';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { ListRooms, NoRooms, RoomLabel } from '@/components/Home';

const MyRooms = () => {
  const { push } = useRouter();
  const { data, loading } = useAuth();

  const roomRef = collection(db, 'rooms');

  const [createdRooms] = useCollection<IRoom>(
    query(roomRef, where('creator', '==', data.userTag ?? '')),
    { deps: [loading] }
  );
  const [joinedRooms] = useCollection<IRoom>(
    query(roomRef, where('members', 'array-contains', data.userTag ?? '')),
    { deps: [loading] }
  );

  return (
    <div>
      <div className='w-full mb-4 space-y-2'>
        <RoomLabel label='create' rooms={createdRooms} limit='3' />

        {createdRooms?.length ? (
          createdRooms?.map((room) => <ListRooms key={room.id} room={room} />)
        ) : (
          <NoRooms desc='Create a Room' href='/create' />
        )}

        <RoomLabel label='join' rooms={joinedRooms} limit='∞' />

        {joinedRooms?.length ? (
          joinedRooms?.map((room) => <ListRooms key={room.id} room={room} />)
        ) : (
          <NoRooms desc='Join a Room' href='/join' />
        )}
      </div>
    </div>
  );
};

export default MyRooms;
