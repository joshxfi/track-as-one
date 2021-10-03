import React from 'react'
import Image from 'next/image'
import avatar from '../../public/assets/avatar.svg'
import avatar2 from '../../public/assets/avatar2.svg'
import { wcpage1, wcpage2 } from '../static/text'
import { FaSignInAlt, FaHandHoldingHeart, FaPhone } from 'react-icons/fa'

import { useAuth } from '../context/AuthContext'
import { WcButton } from './Button/YellowBtn'

export const Welcome: React.FC = () => {
  const { signIn } = useAuth()

  return (
    <>
      <section className='wrap h-screen max-w-screen-xl lg:items-start lg:pt-28 lg:flex-row lg:justify-between'>
        <div className='pt-8 lg:flex lg:justify-between lg:flex-col lg:items-start text-center'>
          <h1 className='text-5xl font-bold md:text-7xl xl:text-8xl lg:mb-2'>
            trackAs
            <span className='gradient-text'>One</span>
          </h1>

          <div className='wrap lg:items-start max-w-screen-xl lg:pl-2'>
            <div className='text-center lg:text-left'>
              <div className='my-8 w-[300px] mx-auto lg:hidden'>
                <Image
                  src={avatar}
                  objectFit='contain'
                  alt='trackAsOne avatar'
                />
              </div>

              <h1 className='text-2xl font-semibold lg:font-medium lg:text-3xl lg:w-[500px] xl:w-auto'>
                Life&apos;s already difficult, don&apos;t make it harder.
              </h1>

              <p className='mt-2 text-lg lg:w-[490px] xl:w-[650px] xl:text-xl'>
                {wcpage1}
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

      <section className='mx-auto max-w-screen-xl lg:flex lg:justify-between h-screen mt-36 xs:mt-0'>
        <div className='text-center lg:text-left lg:pl-2'>
          <h1 className='text-2xl font-semibold lg:font-medium lg:text-3xl'>
            Built by a student for students.
          </h1>
          <p className='mt-2 text-lg lg:w-[490px] xl:w-[600px] xl:text-xl'>
            {wcpage2}
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