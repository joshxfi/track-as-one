import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';

export const Navbar: React.FC = () => {
  return (
    <nav className='w-full bg-primary py-3 text-f9'>
      <div className='flex justify-between items-center w-[85%] mx-auto'>
        <h1 className='text-secondary font-bold text-3xl'>
          tAO<span className='text-f9'>.</span>
        </h1>
        <div className='flex items-center text-sm'>
          <p className='font-medium mr-2'>sign in</p>
          <FaSignInAlt className='text-secondary' />
        </div>
      </div>
    </nav>
  );
};
