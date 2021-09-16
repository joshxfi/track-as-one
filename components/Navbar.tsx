import React from 'react';
import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { authUser, signIn, signOut } = useAuth();

  return (
    <nav className='w-full bg-primary py-3 text-f9'>
      <div className='flex justify-between items-center w-[85%] mx-auto'>
        <Link href='/' passHref>
          <h1 className='text-secondary font-bold text-3xl cursor-pointer'>
            tAO<span className='text-f9'>.</span>
          </h1>
        </Link>
        {authUser ? (
          <NavBtn method='sign out' onTap={signOut} />
        ) : (
          <NavBtn method='sign in' onTap={signIn} />
        )}
      </div>
    </nav>
  );
};

const NavBtn = ({ method, onTap }: NavBtnProps) => {
  return (
    <div onClick={onTap} className='flex items-center text-sm cursor-pointer'>
      <p className='text-sm mr-2'>{method}</p>
      <FaSignInAlt className='text-secondary' />
    </div>
  );
};
