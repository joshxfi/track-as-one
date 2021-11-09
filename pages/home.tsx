import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BiDoorOpen } from 'react-icons/bi'
import { AiOutlineIdcard } from 'react-icons/ai'
import { VscSignIn, VscListOrdered } from 'react-icons/vsc'

import { Clipboard, Container } from '@/components'
import { defaultPic } from '@/utils/default'
import { HomeBtn } from '@/components/Button'
import { useAuth } from '@/context/AuthContext'

const Homepage: React.FC = () => {
  const { data } = useAuth()
  const { userTag, photoURL, username } = data
  const [copied, setCopied] = useState<boolean>(false)

  const copyTag = () => {
    navigator.clipboard.writeText(userTag ?? '')
    setCopied(true)

    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <Container>
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
            <h1 className='text-2xl font-bold'>{username}</h1>
            <p>{userTag}</p>
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
    </Container>
  )
}

export default Homepage
