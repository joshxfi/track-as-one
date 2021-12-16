import React from 'react';
import Image from 'next/image';
import { Layout } from '@/components';
import avatar from '@/assets/avatar.svg';
import avatar2 from '@/assets/avatar2.svg';
import { FaHandHoldingHeart, FaPhone, FaSignInAlt } from 'react-icons/fa';
import { Button } from '@/components/Button';

const Index = () => {
  return (
    <Layout
      xl
      title='trackAsOne'
      description='trackAsOne is a collaborative cross-platform app that enables
    students to track homework & activities together with their
    friends or classmates.'
    >
      <section className='flex flex-col items-center mx-auto h-screen max-w-screen-xl lg:items-start lg:mt-20  lg:flex-row lg:justify-between'>
        <div className='pt-8 lg:flex lg:justify-between lg:flex-col lg:items-start text-center'>
          <h1 className='text-5xl font-bold md:text-7xl xl:text-8xl lg:mb-2'>
            trackAs
            <span className='gradient-text'>One</span>
          </h1>

          <div className='flex flex-col items-center lg:items-start max-w-screen-xl lg:pl-2'>
            <div className='text-center lg:text-left'>
              <div className='my-8 w-[300px] mx-auto lg:hidden'>
                <Image
                  priority
                  src={avatar}
                  objectFit='contain'
                  alt='trackAsOne avatar'
                />
              </div>

              <h1 className='text-2xl font-semibold lg:font-medium lg:text-2xl xl:text-3xl xl:w-auto'>
                An open-source{' '}
                <span className='block sm:inline'>
                  collaborative task tracker.
                </span>
              </h1>

              <p className='mt-2 text-lg lg:w-[540px] xl:w-[650px] xl:text-xl'>
                Every now and then, someone would pop in the group chat and say:{' '}
                <span className='italic font-medium'>
                  What assignments do we have? When is it due?
                </span>{' '}
                With this web app, you can track tasks collaboratively with your
                peers!
              </p>
            </div>

            <Button
              className='welcome-btn'
              name='get started'
              Icon={FaSignInAlt}
            />
            <p className='mt-2 italic text-base font-medium'>coming soon!</p>
          </div>
        </div>

        <div className='w-[400px] hidden lg:block pt-12'>
          <Image src={avatar} objectFit='contain' alt='trackAsOne avatar' />
        </div>
      </section>

      <section className='mx-auto max-w-screen-xl lg:flex lg:justify-between pb-8 mt-36 xs:mt-0'>
        <div className='text-center lg:text-left lg:pl-2'>
          <h1 className='text-2xl font-semibold lg:font-medium lg:text-3xl'>
            Built by a student for students.
          </h1>
          <p className='mt-2 text-lg lg:w-[490px] xl:w-[600px] xl:text-xl'>
            trackAsOne is a collaborative cross-platform app that enables
            students to track homework & activities together with their friends
            or classmates.
          </p>
          <div className='flex flex-col lg:flex-row items-center'>
            <Button
              className='welcome-btn lg:mr-5'
              name='contribute'
              Icon={FaHandHoldingHeart}
              iconStyles='text-lg'
            />
            <Button className='welcome-btn' name='contact me' Icon={FaPhone} />
          </div>
        </div>

        <div className='mt-8 w-[300px] lg:w-[400px] mx-auto lg:mx-0'>
          <Image
            priority
            src={avatar2}
            objectFit='contain'
            alt='trackAsOne avatar'
          />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
