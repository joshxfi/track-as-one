import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Loader } from '.';

const LoaderHandler: React.FC = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className='h-screen grid place-items-center'>
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};

export default LoaderHandler;
