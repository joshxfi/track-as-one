import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BiDoorOpen } from 'react-icons/bi'
import { VscSignIn, VscListOrdered } from 'react-icons/vsc'
import { AiOutlineIdcard } from 'react-icons/ai'

import { useFirestore } from '@/context/FirestoreContext'
import Clipboard from './Global/Clipboard'
import { HomeBtn } from './Button/HomeBtn'
import { defaultPic } from '../static/utils'

export const Homepage: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false)

  const { currentUser } = useFirestore()
  const { userTag, displayName, photoURL } = currentUser ?? {}

  const copyTag = () => {
    navigator.clipboard.writeText(userTag ?? '')
    setCopied(true)

    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <section className='wrap'>
      <div className='flex-between mt-8 w-full'>
        <div className='h-[100px] w-[100px] rounded-full p-2 primary-gradient'>
          <Image
            src={photoURL ?? defaultPic}
            height={100}
            width={100}
            objectFit='cover'
            className='rounded-full'
            alt='profile picture'
          />
        </div>

        <div className='text-right'>
          <h1 className='text-2xl font-bold'>{displayName ?? 'User'}</h1>
          <p>{userTag ?? 'userTag:hEllO'}</p>
        </div>
      </div>

      <div className='bg-gradient-to-tr from-secondary to-[#FFDC54] h-[2px] my-8 w-full' />

      <div className='md:grid grid-cols-2 gap-x-2'>
        <motion.button
          whileHover={{ scale: 0.96 }}
          onClick={copyTag}
          className='rounded-[36px] bg-primary text-f9 p-2 w-[300px] px-[50px] mt-4 btnEffect flex-between'
        >
          <p className='mr-4'>copy user tag</p>{' '}
          <AiOutlineIdcard className='text-xl text-secondary' />
        </motion.button>
        <HomeBtn href='/create' desc='create room' Icon={BiDoorOpen} />
        <HomeBtn href='/join' desc='join room' Icon={VscSignIn} />
        <HomeBtn href='/list' desc='my rooms' Icon={VscListOrdered} />
      </div>

      <Clipboard copied={copied} />
    </section>
  )
}
