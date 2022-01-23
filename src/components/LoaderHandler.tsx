import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader } from '.';

type ILoader = {
  loaders?: boolean[];
};

const LoaderHandler: React.FC<ILoader> = ({ loaders, children }) => {
  const { loading } = useAuth();

  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const _loading = () => {
    if (loaders) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < loaders.length; i++) {
        if (loaders[i]) return true;
      }
    }

    return false;
  };

  if (loading || _loading()) {
    return (
      <AnimatePresence exitBeforeEnter>
        <motion.div
          variants={variants}
          initial='hidden'
          animate='enter'
          exit='exit'
          transition={{ duration: 0.3 }}
          className='h-screen grid place-items-center'
        >
          <Loader />
        </motion.div>
      </AnimatePresence>
    );
  }

  return <>{children}</>;
};

export default LoaderHandler;
