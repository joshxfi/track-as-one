import React from 'react';
import { motion } from 'framer-motion';
import { NextSeo, NextSeoProps } from 'next-seo';
import { Navbar, Footer, LoaderHandler } from '@/components';

interface LayoutProps extends NextSeoProps {
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ className, children, ...rest }) => {
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <NextSeo {...rest} />
      <div className='bg-gradient-to-tr from-[#F2F1DD] to-f9'>
        <LoaderHandler>
          <Navbar />
          <motion.main
            variants={variants}
            initial='hidden'
            animate='enter'
            exit='exit'
            transition={{ duration: 0.3 }}
            className={`text-primary w-[90%] mx-auto min-h-screen ${className}`}
          >
            {children}
          </motion.main>
          <Footer />
        </LoaderHandler>
      </div>
    </>
  );
};

export default Layout;
