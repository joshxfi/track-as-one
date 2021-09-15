import React from 'react';
import Image from 'next/image';
import { FaSignInAlt } from 'react-icons/fa';
import avatar from '../public/assets/avatar.svg';

const index: React.FC = () => {
  return (
    <div className='flex flex-col items-center leading-3'>
      <header className='mt-12 text-center mb-4'>
        <h1 className='text-5xl font-bold'>trackAsOne</h1>
        <i className='text-base'>organize your tasks as one</i>
      </header>
      <button className='flex items-center justify-between text-f9 bg-primary rounded-[36px] text-sm h-[36px] px-[50px] mb-12'>
        <p className='mr-2'>sign in with google</p>{' '}
        <FaSignInAlt className='text-secondary' />
      </button>
      <div>
        <Image src={avatar} objectFit='contain' alt='trackAsOne avatar' />
      </div>
    </div>
  );
};

export default index;
