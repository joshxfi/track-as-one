import React from 'react'
import Link from 'next/link'
import { FaSignInAlt } from 'react-icons/fa'

export const Navbar: React.FC = () => {
  return (
    <nav className='w-full bg-primary py-3 text-f9 shadow-lg'>
      <div className='flex-between w-[85%] max-w-screen-xl mx-auto'>
        <Link href='/'>
          <a className='text-secondary font-bold text-3xl cursor-pointer'>
            tAO<span className='text-f9'>.</span>
          </a>
        </Link>
        <NavBtn method='sign in' />
      </div>
    </nav>
  )
}

interface NavBtnProps {
  method: string
  onTap?: () => void
}

const NavBtn = ({ method, onTap }: NavBtnProps) => {
  return (
    <button
      type='button'
      onClick={onTap}
      className='flex items-center text-sm cursor-pointer'
    >
      <p className='text-sm mr-2'>{method}</p>
      <FaSignInAlt className='text-secondary' />
    </button>
  )
}
