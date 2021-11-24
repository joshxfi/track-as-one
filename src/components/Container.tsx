import React from 'react';
import { Layout, Welcome } from '@/components';
import { useAuth } from '@/context/AuthContext';

interface ContainerProps {
  styles?: string;
  children: React.ReactNode;
}

const Container = ({ styles, children }: ContainerProps) => {
  return (
    <Layout>
      <div className={styles}>{children}</div>
    </Layout>
  );
};

export default Container;
