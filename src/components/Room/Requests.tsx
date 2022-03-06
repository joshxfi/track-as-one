/* eslint-disable import/order */
import React from 'react';
import { RoomMenu, UserRequest } from '.';
import { Header, EmptyMsg } from '@/components';
import { useRoomContext } from '@/contexts/RoomContext';

const Requests = () => {
  const { room, roomId } = useRoomContext();

  return (
    <>
      <RoomMenu room={room!} />
      <Header title='Requests' />
      {!room?.requests?.length && <EmptyMsg empty='requests' />}
      <div className='mb-4 w-full space-y-2'>
        {room?.requests?.map((user) => (
          <UserRequest key={user} userId={user} roomId={roomId} />
        ))}
      </div>
    </>
  );
};

export default Requests;
