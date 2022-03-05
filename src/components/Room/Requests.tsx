/* eslint-disable import/order */
import React from 'react';
import { useRoom } from '@/services';
import { useNextQuery } from '@/hooks';
import { RoomMenu, UserRequest } from '.';
import { Layout, Header, EmptyMsg } from '@/components';

const Requests = () => {
  const id = useNextQuery('id');
  const [room, loading] = useRoom(id);

  return (
    <Layout loaders={[loading]}>
      <RoomMenu room={room!} />
      <Header title='Requests' />
      {!room?.requests?.length && <EmptyMsg empty='requests' />}
      <div className='mb-4 w-full space-y-2'>
        {room?.requests?.map((user) => (
          <UserRequest key={user} userId={user} roomId={id} />
        ))}
      </div>
    </Layout>
  );
};

export default Requests;
