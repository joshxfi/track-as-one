import React from 'react';
import Image from 'next/image';
import { FaSignInAlt } from 'react-icons/fa';

import { Layout } from '@/components';
import avatar from '@/assets/avatar.svg';
import { Button } from '@/components/Button';

const Index = () => {
  return (
    <Layout
      xl
      allowAll
      title='trackAsOne'
      className='pt-20'
      description='trackAsOne is a collaborative cross-platform app that enables
    students to track homework & activities together with their
    friends or classmates.'
    >
      <section className='flex flex-col items-center mx-auto max-w-screen-xl lg:items-start lg:mt-20 lg:flex-row lg:justify-between'>
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

              <h1 className='text-2xl font-semibold xl:text-3xl xl:w-auto font-serif'>
                A collaborative task tracker.
              </h1>

              <p className='mt-2 text-md sm:text-lg lg:w-[540px] xl:w-[650px] xl:text-xl'>
                Every now and then, someone would pop in the group chat and say:
                &quot;What assignments do we have? When is it due?&quot; With
                this web app, you can track tasks collaboratively with your
                peers!
              </p>
            </div>

            <Button
              className='welcome-btn'
              name='get started'
              Icon={FaSignInAlt}
            />
          </div>
        </div>

        <div className='w-[400px] hidden lg:block pt-12'>
          <Image src={avatar} objectFit='contain' alt='trackAsOne avatar' />
        </div>
      </section>

      <section className='md:my-40 my-20 border-y-2 border-primary md:py-12 py-5'>
        <ul className='text-md sm:text-2xl md:text-3xl xl:text-5xl text-primary flex justify-between text-opacity-90'>
          {['User-Friendly', 'Collaborative', 'Open-Source'].map((i) => (
            <li key={i}>
              <p className='font-serif font-semibold'>{i}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className='mx-auto max-w-screen-xl pb-40 md:space-y-40 space-y-32'>
        <Info
          title='Built by a student for students.'
          body='trackAsOne is a responsive web-based app that enables students to track homework & activities together with their friends or classmates. Forgot about a homework? Your friends got your back!'
        />

        <Info
          title='Why use this task tracker?'
          body="Tasks given by teachers are usually on different platforms. Few
            examples are Messenger and MS Teams. The problem is that they are
            usually cluttered with conversations making it hard to scroll back
            and you have to check multiple platforms just to make sure you won't
            miss a task."
        />
      </section>
    </Layout>
  );
};

interface InfoProps {
  title: string;
  body: string;
}

const Info = ({ title, body }: InfoProps) => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-xl sm:text-2xl lg:text-4xl font-semibold font-serif'>
        {title}
      </h1>
      <p className='text-md mt-2 sm:text-lg lg:w-[490px] xl:w-[670px] xl:text-xl text-center'>
        {body}
      </p>
    </div>
  );
};

export default Index;
