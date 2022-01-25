import React from 'react';
import { useUser } from '@/services';
import { Invitation } from '@/components/Home';
import { useAuth } from '@/context/AuthContext';
import { Layout, Header, EmptyMsg } from '@/components';

const Invites: React.FC = () => {
  const { data } = useAuth();
  const [user, loading] = useUser(data.id, true);

  return (
    <Layout loaders={[loading]}>
      <Header title='Invitation' />
      {!user?.invites?.length && <EmptyMsg empty='invites' />}
      <div className='w-full mb-4'>
        {user?.invites?.map((roomID) => (
          <Invitation user={user} key={roomID} roomID={roomID} />
        ))}
      </div>
    </Layout>
  );
};

export default Invites;
