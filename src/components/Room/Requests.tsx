/* eslint-disable import/order */
import React from 'react';
import { useRoom } from '@/services';
import { useNextQuery } from '@/hooks';
import { RoomMenu, UserRequest } from '.';
import { Layout, Header, EmptyMsg } from '@/components';

const Requests = () => {
  const id = useNextQuery('id');
  const [room, loading] = useRoom(id, true);

  return (
    <Layout loaders={[loading]}>
      <RoomMenu room={room!} />
      <Header title='Requests' />
      {!room?.requests?.length && <EmptyMsg empty='requests' />}
      <div className='w-full mb-4'>
        {room?.requests?.map((user) => (
          <UserRequest key={user} userId={user} roomId={id} />
        ))}
      </div>
    </Layout>
  );
};

export default Requests;
