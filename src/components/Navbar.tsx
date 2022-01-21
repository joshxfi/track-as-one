import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
  const { user, signIn, signOut } = useAuth();
  const { push, asPath } = useRouter();

  return (
    <nav className='w-full bg-primary py-4 transition-all duration-300 text-f9 shadow-lg fixed z-50'>
      <div className='flex-between w-[85%] max-w-screen-xl mx-auto'>
        <div className='flex space-x-8 items-center'>
          <button onClick={() => push(user ? '/home' : '/')} type='button'>
            <a className='text-secondary font-bold text-3xl cursor-pointer'>
              tAO<span className='text-f9'>.</span>
            </a>
          </button>

          <div className='space-x-8 hidden md:block'>
            {['Home', 'About', 'Contact'].map((name) => {
              const href = name.toLowerCase();

              return (
                <Link href={`/${encodeURIComponent(href)}`} key={name}>
                  <a
                    className={`${
                      asPath === href && 'text-secondary'
                    }  text-sm hover:text-secondary transition-colors`}
                  >
                    {name}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
        <button
          type='button'
          onClick={user ? signOut : signIn}
          className='flex items-center text-sm py-2 px-4 bg-secondary rounded text-primary shadow-sm hover:shadow-lg hover:bg-secondary/90 transition-opacity'
        >
          <p suppressHydrationWarning className='text-sm mr-2 font-medium'>
            {user ? 'sign out' : 'login'}
          </p>
          <FaSignInAlt />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
