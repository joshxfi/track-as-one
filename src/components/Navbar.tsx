import React from 'react'
import Link from 'next/link'
import { FaSignInAlt } from 'react-icons/fa'
import { useAuth } from '@/context/AuthContext'

const Navbar: React.FC = () => {
  const { user, signIn, signOut } = useAuth()

  return (
    <nav className='w-full bg-primary py-3 text-f9 shadow-lg'>
      <div className='flex-between w-[85%] max-w-screen-xl mx-auto'>
        <Link href='/'>
          <a className='text-secondary font-bold text-3xl cursor-pointer'>
            tAO<span className='text-f9'>.</span>
          </a>
        </Link>
        <button
          type='button'
          onClick={user ? signOut : signIn}
          className='flex items-center text-sm cursor-pointer'
        >
          <p className='text-sm mr-2'>{user ? 'sign out' : 'login'}</p>
          <FaSignInAlt className='text-secondary' />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
