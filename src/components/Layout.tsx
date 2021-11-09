import React from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'

import { Navbar, Footer } from '@/components'

const Layout: React.FC<Children> = ({ children }) => {
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, minimum-scale=1'
        />
        <title>taskAsOne</title>
      </Head>
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
  )
}

export default Layout
