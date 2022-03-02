import React from 'react';
import { ListRooms, NoRooms, RoomLabel } from '@/components/Home';

interface MyRoomsProps {
  createdRooms?: IRoom[];
  joinedRooms?: IRoom[];
}

const MyRooms = ({ createdRooms, joinedRooms }: MyRoomsProps) => {
  return (
    <div className='w-full space-y-2'>
      <RoomLabel
        label='Create'
        roomLength={createdRooms?.length ?? 0}
        limit='3'
      />

      {createdRooms?.length ? (
        createdRooms?.map((room) => <ListRooms key={room.id} room={room} />)
      ) : (
        <NoRooms desc='Create a Room' href='/create' />
      )}

      <RoomLabel label='Join' roomLength={joinedRooms?.length ?? 0} limit='∞' />

      {joinedRooms?.length ? (
        joinedRooms?.map((room) => <ListRooms key={room.id} room={room} />)
      ) : (
        <NoRooms desc='Join a Room' href='/join' />
      )}
    </div>
  );
};

export default MyRooms;
