import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavMenu } from '@/components/Nav';
import { FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const { asPath } = useRouter();
  const { user, signIn, signOut } = useAuth();

  return (
    <nav
      className={`w-full bg-primary py-4 text-f9 shadow-lg transition-all duration-300 ${
        asPath === '/' && 'fixed z-50'
      }`}
    >
      <div className='flex-between mx-auto w-[90%] max-w-screen-xl'>
        <div className='flex items-center space-x-8'>
          <Link href={user ? '/home' : '/'}>
            <a className='flex cursor-pointer'>
              <p className='gradient-text text-2xl font-bold'>trackAsOne</p>
              <p className='ml-1 text-xs font-semibold'>BETA</p>
            </a>
          </Link>
        </div>

        <div className='flex items-center space-x-6'>
          <NavMenu />
          <a
            href='https://github.com/joshxfi/trackAsOne'
            rel='noopener noreferrer'
            target='_blank'
            className='hidden text-f9 hover:underline md:block'
          >
            GitHub
          </a>
          <button
            type='button'
            onClick={user ? signOut : signIn}
            className='hidden items-center rounded bg-secondary px-4 py-2 font-medium text-primary transition-colors hover:bg-secondary/90 md:flex'
          >
            <p suppressHydrationWarning className='mr-2 text-sm'>
              {user ? 'Sign Out' : 'Login'}
            </p>
            <FaSignInAlt />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
