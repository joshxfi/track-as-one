import React, { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Loader } from '.';

type ILoader = {
  loaders?: boolean[];
};

const LoaderHandler: React.FC<ILoader> = ({ loaders, children }) => {
  const { loading } = useAuth();

  const _loading = useMemo(() => {
    if (loaders) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < loaders.length; i++) {
        if (loaders[i]) return true;
      }
    }

    return false;
  }, [loaders]);

  if (loading || _loading) {
    return (
      <div className='grid h-screen place-items-center'>
        <Loader />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default LoaderHandler;
