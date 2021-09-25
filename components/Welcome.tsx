import React from 'react'
import Image from 'next/image'
import avatar from '../public/assets/avatar.svg'
import avatar2 from '../public/assets/avatar2.svg'
import { FaSignInAlt, FaHandHoldingHeart, FaPhone } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { WcButton } from './global/WcButton'

export const Welcome: React.FC = () => {
  const { signIn } = useAuth()

  return (
    <>
      <section className='wrap h-screen lg:container lg:items-start lg:pt-28 lg:flex-row lg:justify-between'>
        <div className='pt-8 lg:flex lg:justify-between lg:flex-col lg:items-start text-center'>
          <h1 className='text-5xl font-bold md:text-7xl xl:text-8xl lg:mb-2'>
            trackAs
            <span className='gradient-text'>One</span>
          </h1>

          <div className='wrap lg:items-start lg:container lg:pl-2'>
            <div className='text-center lg:text-left'>
              <div className='my-8 w-[300px] mx-auto lg:hidden'>
                <Image
                  src={avatar}
                  objectFit='contain'
                  alt='trackAsOne avatar'
                />
              </div>

              <h1 className='text-2xl font-semibold lg:font-medium lg:text-4xl'>
                Life&apos;s hard, don&apos;t make it harder.
              </h1>

              <p className='mt-2 text-lg lg:w-[490px] xl:w-[600px] xl:text-xl'>
                With our current situation, there is no time to compete with
                each other. This platform helps students to unite and
                collaborate. Create rooms, invite your friends, and track tasks
                together, so nobody gets left behind!
              </p>
            </div>

            <WcButton
              desc='get started'
              Icon={FaSignInAlt}
              handleClick={signIn}
            />
          </div>
        </div>

        <div className='w-[400px] hidden lg:block pt-12'>
          <Image src={avatar} objectFit='contain' alt='trackAsOne avatar' />
        </div>
      </section>

      <section className='lg:flex lg:justify-between lg:h-[80vh]'>
        <div className='text-center lg:text-left lg:pl-2'>
          <h1 className='text-2xl font-semibold lg:font-medium lg:text-4xl'>
            Built by a student for students.
          </h1>
          <p className='mt-2 text-lg lg:w-[490px] xl:w-[600px] xl:text-xl'>
            trackAsOne is a collaborative cross-platform app that enables
            students to track homework, activities, and more together with their
            friends or classmates.
          </p>
          <div className='flex flex-col lg:flex-row items-center'>
            <WcButton
              style='lg:mr-5'
              desc='contribute'
              Icon={FaHandHoldingHeart}
              iconSize='text-lg'
            />
            <WcButton desc='contact me' Icon={FaPhone} />
          </div>
        </div>

        <div className='mt-8 w-[300px] lg:w-[400px] mx-auto lg:mx-0'>
          <Image src={avatar2} objectFit='contain' alt='trackAsOne avatar' />
        </div>
      </section>
    </>
  )
}