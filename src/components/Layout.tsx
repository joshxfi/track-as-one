import React from 'react';
import { motion } from 'framer-motion';
import { NextSeo, NextSeoProps } from 'next-seo';

import { useAuth } from '@/context/AuthContext';
import { Navbar, Footer, LoaderHandler, Error } from '@/components';

interface LayoutProps extends NextSeoProps {
  className?: string;
  loaders?: boolean[];
  xl?: boolean;
  allowAll?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  className,
  loaders,
  xl,
  allowAll,
  children,
  ...rest
}) => {
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const { user } = useAuth();

  const display = () => {
    if (user || allowAll) return children;
    return <Error code='401' info='you are not authenticated' />;
  };

  return (
    <>
      <NextSeo {...rest} />
      <motion.div
        variants={variants}
        initial='hidden'
        animate='enter'
        exit='exit'
        transition={{ duration: 0.3 }}
        className='bg-gradient-to-tr from-[#F2F1DD] to-f9'
      >
        <LoaderHandler loaders={loaders}>
          <Navbar />
          <main
            className={`text-primary w-[90%] mx-auto min-h-screen ${
              xl ? 'max-w-screen-xl' : 'max-w-screen-md'
            }  ${className}`}
          >
            {display()}
          </main>
          <Footer />
        </LoaderHandler>
      </motion.div>
    </>
  );
};

export default Layout;
