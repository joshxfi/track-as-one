import React from 'react';
import Link from 'next/link';
import { Header } from './global/Header';
import { BiDoorOpen } from 'react-icons/bi';
import { VscSignIn, VscListOrdered } from 'react-icons/vsc';
import { AiOutlineIdcard } from 'react-icons/ai';

export const Homepage: React.FC = () => {
  return (
    <section className='wrap'>
      <Header />
      <Btn name='create a room' link='/create' Icon={BiDoorOpen} />
      <Btn name='join a room' link='/join' Icon={VscSignIn} />
      <Btn name='my room list' link='/roomlist' Icon={VscListOrdered} />
      <button className='btn w-[250px]'>
        <p>copy user id</p> <AiOutlineIdcard className='icon' />
      </button>
    </section>
  );
};

const Btn: React.FC<HomepageButtonProps> = ({ name, link, Icon }) => {
  return (
    <Link href={link} passHref>
      <button className='btn w-[250px]'>
        <p>{name}</p>
        <Icon className='icon' />
      </button>
    </Link>
  );
};
