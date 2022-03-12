import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavMenu } from '@/components/Nav';
import { FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, signIn, signOut } = useAuth();
  const { asPath } = useRouter();

  const navItems = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`w-full bg-primary py-4 text-f9 shadow-lg transition-all duration-300 ${
        asPath === '/' && 'fixed z-50'
      }`}
    >
      <div className='flex-between mx-auto w-[90%] max-w-screen-xl'>
        <div className='flex items-center space-x-8'>
          <Link href={user ? '/home' : '/'}>
            <a className='cursor-pointer text-3xl font-bold text-secondary'>
              tAO<span className='text-f9'>.</span>
            </a>
          </Link>

          <div className='hidden space-x-8 md:block'>
            <a
              href='https://github.com/joshxfi/trackAsOne'
              rel='noopener noreferrer'
              target='_blank'
              className='text-sm transition-colors hover:text-secondary'
            >
              GitHub
            </a>
            {navItems.map(({ name, href }) => {
              return (
                <Link href={href} key={name}>
                  <a
                    className={`${
                      asPath === href && 'text-secondary'
                    }  text-sm transition-colors hover:text-secondary`}
                  >
                    {name}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>

        <div className='flex space-x-4'>
          <NavMenu />
          <button
            type='button'
            onClick={user ? signOut : signIn}
            className='hidden items-center rounded bg-secondary py-2 px-4 text-sm text-primary shadow-sm transition-opacity hover:bg-secondary/90 hover:shadow-lg md:flex'
          >
            <p suppressHydrationWarning className='mr-2 text-sm font-medium'>
              {user ? 'sign out' : 'login'}
            </p>
            <FaSignInAlt />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
