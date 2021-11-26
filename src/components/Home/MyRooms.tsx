import React from 'react';
import { ListRooms, NoRooms, RoomLabel } from '@/components/Home';

interface MyRoomsProps {
  createdRooms: IRoom[];
  joinedRooms: IRoom[];
}

const MyRooms = ({ createdRooms, joinedRooms }: MyRoomsProps) => {
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
