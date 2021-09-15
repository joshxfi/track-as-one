import React from 'react';
import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa';

export const Navbar: React.FC = () => {
  return (
    <nav className='w-full bg-primary py-3 text-f9'>
      <div className='flex justify-between items-center w-[85%] mx-auto'>
        <Link href='/homepage' passHref>
          <h1 className='text-secondary font-bold text-3xl'>
            tAO<span className='text-f9'>.</span>
          </h1>
        </Link>
        <div className='flex items-center text-sm'>
          <p className='text-sm mr-2'>sign in</p>
          <FaSignInAlt className='text-secondary' />
        </div>
      </div>
    </nav>
  );
};
