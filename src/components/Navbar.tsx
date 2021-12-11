import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useScroll } from '@/hooks';

const Navbar: React.FC = () => {
  const { user, signIn, signOut } = useAuth();
  const { push, asPath } = useRouter();

  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const { isUp, yOffset } = useScroll();

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.clientHeight);
    }
  }, [yOffset]);

  return (
    <nav
      style={{
        top: isUp ? 0 : -navHeight,
      }}
      ref={navRef}
      className='w-full bg-primary py-3 transition-all duration-300 text-f9 shadow-lg fixed z-50'
    >
      <div className='flex-between w-[85%] max-w-screen-xl mx-auto'>
        <div className='flex space-x-8 items-center'>
          <button onClick={() => push(user ? '/home' : '/')} type='button'>
            <a className='text-secondary font-bold text-3xl cursor-pointer'>
              tAO<span className='text-f9'>.</span>
            </a>
          </button>

          <div className='space-x-8 hidden md:block'>
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
