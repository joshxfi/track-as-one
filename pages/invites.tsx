import React from 'react';
import { useUser } from '@/services';
import { Invitation } from '@/components/Home';
import { useAuth } from '@/context/AuthContext';
import { Layout, Header, EmptyMsg } from '@/components';

const Invites: React.FC = () => {
  const { data } = useAuth();
  const [user, loading] = useUser(data.id);

  return (
    <Layout loaders={[loading]}>
      <Header title='Invitation' />
      {!user?.invites?.length && <EmptyMsg empty='invites' />}
      <div className='mb-4 w-full space-y-2'>
        {user?.invites?.map((roomId) => (
          <Invitation user={user} key={roomId} roomId={roomId} />
        ))}
      </div>
    </Layout>
  );
};

export default Invites;
