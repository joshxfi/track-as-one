import React from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import { Header } from '../components/Header';
import { BiDoorOpen } from 'react-icons/bi';
import { VscSignIn, VscListOrdered } from 'react-icons/vsc';
import { AiOutlineIdcard } from 'react-icons/ai';

const Homepage: React.FC = () => {
  return (
    <section className='wrap'>
      <Header />
      <Button name='create a room' link='/create' Icon={BiDoorOpen} />
      <Button name='join a room' link='/join' Icon={VscSignIn} />
      <Button name='my room list' link='/rooms' Icon={VscListOrdered} />
      <button className='btn w-[250px]'>
        <p>copy user id</p> <AiOutlineIdcard className='icon' />
      </button>
    </section>
  );
};

export default Homepage;

interface HomepageButtonProps {
  name: string;
  link: string;
  Icon: IconType;
}

const Button: React.FC<HomepageButtonProps> = ({ name, link, Icon }) => {
  return (
    <Link href={link}>
      <button className='btn w-[250px]'>
        <p>{name}</p>
        <Icon className='icon' />
      </button>
    </Link>
  );
};
