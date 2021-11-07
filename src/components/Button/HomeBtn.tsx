import React from 'react'

import router from 'next/router'
import { motion } from 'framer-motion'

interface HomepageButtonProps extends LinkButtonProps {}

const HomeBtn: React.FC<HomepageButtonProps> = ({ desc, href, Icon }) => {
  return (
    <motion.button
      type='button'
      whileHover={{ scale: 0.96 }}
      onClick={() => router.push(href ?? '')}
      className='rounded-[36px] bg-primary text-f9 p-2 w-[300px] px-[50px] mt-4 btnEffect flex-between'
    >
      <p className='mr-4'>{desc}</p> <Icon className='text-xl text-secondary' />
    </motion.button>
  )
}

export default HomeBtn