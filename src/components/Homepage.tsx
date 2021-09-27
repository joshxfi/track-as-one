import React from 'react'
import { Header } from './global/Header'
import { BiDoorOpen } from 'react-icons/bi'
import { VscSignIn, VscListOrdered } from 'react-icons/vsc'
import { AiOutlineIdcard } from 'react-icons/ai'
import { WcButton } from './global/WcButton'
import router from 'next/router'

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

const HomeBtn: React.FC<HomepageButtonProps> = ({ desc, link, Icon }) => {
  return (
    <WcButton
      handleClick={() => router.push(link)}
      desc={desc}
      style='w-[270px] border-primary'
      iconSize='text-xl'
      Icon={Icon}
    />
  )
}
