import React from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/components';
import { NextSeo, NextSeoProps } from 'next-seo';

const Layout: React.FC<NextSeoProps> = ({ children, ...rest }) => {
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <NextSeo {...rest} />
      <div className='bg-gradient-to-tr from-[#F2F1DD] to-f9'>
        <Navbar />
        <motion.main
          variants={variants}
          initial='hidden'
          animate='enter'
          exit='exit'
          transition={{ duration: 0.3 }}
          className='text-primary w-[90%] mx-auto min-h-screen'
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
