import React from 'react';
import Image from 'next/image';
import avatar from '../public/assets/avatar.svg';
import { FaSignInAlt } from 'react-icons/fa';
import { Header } from '../components/Header';

const index: React.FC = () => {
  return (
    <div className='wrap'>
      <Header />
      <button className='btn'>
        <p className='mr-2'>sign in with google</p>{' '}
        <FaSignInAlt className='text-secondary' />
      </button>
      <div className='mt-12'>
        <Image src={avatar} objectFit='contain' alt='trackAsOne avatar' />
      </div>
    </div>
  );
};

export default index;
