import React from 'react';
import Image from 'next/image';
import avatar from '../public/assets/avatar.svg';
import { FaSignInAlt } from 'react-icons/fa';
import { Header } from './Header';
import { useAuth } from '../context/AuthContext';

export const Welcome: React.FC = () => {
  const { signIn } = useAuth();

  return (
    <section className='wrap'>
      <Header />
      <button onClick={signIn} className='btn'>
        <p className='mr-2'>sign in with google</p>{' '}
        <FaSignInAlt className='text-secondary' />
      </button>
      <div className='mt-12'>
        <Image src={avatar} objectFit='contain' alt='trackAsOne avatar' />
      </div>
    </section>
  );
};
