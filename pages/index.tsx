import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { FaSignInAlt } from 'react-icons/fa';

import { Layout } from '@/components';
import { Button } from '@/components/Button';
import { NextPageWithLayout } from 'types/page';
import { useAuth } from '@/contexts/AuthContext';

const Index: NextPageWithLayout = () => {
  const { user, signIn } = useAuth();
  const { push } = useRouter();

  return (
    <>
      <section className='mt-20 flex flex-col items-center text-center'>
        <div className='text-5xl font-semibold md:text-6xl lg:text-7xl'>
          <h1 className='mb-2 font-serif'>A Collaborative</h1>
          <h1 className='font-serif'>Task Tracker</h1>
        </div>

        <p className='my-8 max-w-[700px] md:text-lg'>
          A free and open-source to-do list for you and your classmates! Create
          multiple rooms and invite your friends!
        </p>

        <div className='flex space-x-4'>
          <div className='border-btn-parent group'>
            <a href='#info' className='border-btn'>
              Learn more
            </a>
          </div>

          <div className='border-btn-parent group'>
            <Button
              onClick={user ? () => push('/home') : signIn}
              className='border-btn'
              name='Get started'
              Icon={FaSignInAlt}
            />
          </div>
        </div>
      </section>

      <section
        id='info'
        className='mx-auto mt-24 max-w-screen-xl scroll-mt-32 space-y-24 pb-40 md:mt-32 md:space-y-40'
      >
        <Info
          title='Built by a student for students.'
          body={
            <>
              Hello! I am{' '}
              <a
                href='https://github.com/joshxfi'
                target='_blank'
                rel='noreferrer noopener'
                className='hover:underline'
              >
                @joshxfi
              </a>
              , the creator and maintainer of this open-source project. I
              created trackAsOne to help me and my classmates keep track of our
              school activities.
            </>
          }
        />

        <Info
          title='Why use this task tracker?'
          body='With trackAsOne, you can have a single to-do list where all of your invited friends or classmates would see and collaborate. When you add a task, you can attach photos, a due date, and a URL!'
        />
      </section>
    </>
  );
};

Index.getLayout = (page: ReactElement) => {
  return (
    <Layout wide allowAll className='pt-20 md:pt-28'>
      {page}
    </Layout>
  );
};

interface InfoProps {
  title: string;
  body: React.ReactNode;
}

const Info = ({ title, body }: InfoProps) => {
  return (
    <div className='mx-auto rounded border-[3px] border-b-[6px] border-primary bg-whiteish md:w-[700px]'>
      <div className='flex h-12 items-center space-x-2 border-b-[3px] border-primary bg-primary pl-4'>
        {['bg-red-500', 'bg-amber-500', 'bg-green-500'].map((color) => (
          <i key={color} className={`${color} rounded-full p-[6px]`} />
        ))}
      </div>
      <div className='p-8 text-center md:py-16 md:px-12'>
        <h1 className='mb-4 font-serif text-2xl font-medium md:text-4xl'>
          {title}
        </h1>
        <div className='mt-2 text-center md:text-lg'>{body}</div>
      </div>
    </div>
  );
};

export default Index;
