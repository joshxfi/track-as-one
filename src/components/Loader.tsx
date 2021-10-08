import React from 'react'
import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='h-screen flex justify-center items-center bg-gradient-to-tr from-[#F2F1DD] to-f9'
    >
      <span className='load'></span>
    </motion.div>
  )
}

export default Loader
