import React from 'react'
import Image from 'next/image'
import avatar from '../public/assets/avatar.svg'
import { FaSignInAlt } from 'react-icons/fa'
import { Header } from './global/Header'
import { useAuth } from '../context/AuthContext'

export const Welcome: React.FC = () => {
  const { signIn } = useAuth()

  return (
    <>
      <section className='lg:h-screen wrap lg:items-start lg:container lg:pt-16'>
        <div className='lg:flex lg:justify-between lg:w-full lg:items-center'>
          <div className='flex flex-col items-center lg:items-baseline lg:justify-start'>
            <header className='mt-12 text-center mb-4 lg:text-left'>
              <h1 className='text-5xl font-bold md:text-7xl xl:text-8xl'>
                trackAs
                <span className='text-transparent bg-gradient-to-tr from-secondary to-[#FFDC54] bg-clip-text'>
                  One
                </span>
              </h1>
              <i className='lg:hidden'>organize your tasks as one</i>
              <p className='text-xl hidden lg:block xl:w-[600px] lg:w-[490px]'>
                a collaborative cross-platform app that enables <b>students</b>{' '}
                to track homework, activities, and more <b>together</b> with
                their <b>friends</b> or <b>classmates</b>.
              </p>
            </header>

            <button onClick={signIn} className='btn btnEffect w-[250px]'>
              <p className='mr-2'>join now with google</p>{' '}
              <FaSignInAlt className='text-secondary' />
            </button>
          </div>
          <div className='mt-12 w-[400px] mx-auto lg:mx-0'>
            <Image src={avatar} objectFit='contain' alt='trackAsOne avatar' />
          </div>
        </div>
      </section>
    </>
  )
}
