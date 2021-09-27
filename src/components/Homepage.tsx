import React from 'react'
import { Header } from './global/Header'
import { BiDoorOpen } from 'react-icons/bi'
import { VscSignIn, VscListOrdered } from 'react-icons/vsc'
import { AiOutlineIdcard } from 'react-icons/ai'
import { HomeBtn } from './buttons/HomeBtn'

export const Homepage: React.FC = () => {
  return (
    <section className='wrap'>
      <Header />
      <div className='md:grid grid-cols-2 gap-x-2'>
        <HomeBtn link='/create' desc='create room' Icon={BiDoorOpen} />
        <HomeBtn link='/join' desc='join room' Icon={VscSignIn} />
        <HomeBtn link='/list' desc='my rooms' Icon={VscListOrdered} />
        <HomeBtn link='/profile' desc='view profile' Icon={AiOutlineIdcard} />
      </div>
    </section>
  )
}
