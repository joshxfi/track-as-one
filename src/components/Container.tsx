import React from 'react';
import { Layout, Welcome } from '@/components';
import { useAuth } from '@/context/AuthContext';

interface ContainerProps {
  styles?: string;
  children: React.ReactNode;
}

const Container = ({ styles, children }: ContainerProps) => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className={styles}>{user ? children : <Welcome />}</div>
    </Layout>
  );
};

export default Container;
