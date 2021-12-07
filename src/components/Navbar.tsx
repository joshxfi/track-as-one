import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
  const { user, signIn, signOut } = useAuth();
  const { push, asPath } = useRouter();

  return (
    <nav className='w-full bg-primary py-3 text-f9 shadow-lg'>
      <div className='flex-between w-[85%] max-w-screen-xl mx-auto'>
        <div className='flex space-x-8 items-center'>
          <button onClick={() => push(user ? '/home' : '/')} type='button'>
            <a className='text-secondary font-bold text-3xl cursor-pointer'>
              tAO<span className='text-f9'>.</span>
            </a>
          </button>

          <div className='space-x-8'>
            {['Home', 'About', 'Contact'].map((name) => {
              const href = `/${name.toLowerCase()}`;

              return (
                <Link href='/[name]' as={href} key={name}>
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
          className='flex items-center text-sm cursor-pointer'
        >
          <p suppressHydrationWarning className='text-sm mr-2'>
            {user ? 'sign out' : 'login'}
          </p>
          <FaSignInAlt className='text-secondary' />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
