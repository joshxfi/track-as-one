import React, { ReactElement } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaSignInAlt } from 'react-icons/fa';

import { Layout } from '@/components';
import avatar from '@/assets/avatar.svg';
import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { landingPage } from '@/utils/constants';
import { NextPageWithLayout } from 'types/page';

const Index: NextPageWithLayout = () => {
  const { user, signIn } = useAuth();
  const { push } = useRouter();

  return (
    <>
      <section className='mx-auto flex max-w-screen-xl flex-col items-center lg:mt-20 lg:flex-row lg:items-start lg:justify-between'>
        <div className='pt-8 text-center lg:flex lg:flex-col lg:items-start lg:justify-between'>
          <h1 className='text-5xl font-bold md:text-7xl lg:mb-2 xl:text-8xl'>
            trackAs
            <span className='gradient-text'>One</span>
          </h1>

          <div className='flex max-w-screen-xl flex-col items-center lg:items-start lg:pl-2'>
            <div className='text-center lg:text-left'>
              <div className='my-8 mx-auto w-[300px] lg:hidden'>
                <Image
                  priority
                  src={avatar}
                  objectFit='contain'
                  alt='trackAsOne avatar'
                />
              </div>

              <h1 className='font-serif text-2xl font-semibold xl:w-auto xl:text-3xl'>
                A collaborative task tracker.
              </h1>

              <p className='text-md mt-2 sm:text-lg lg:w-[540px] xl:w-[650px] xl:text-xl'>
                {landingPage.body1}
              </p>
            </div>

            <Button
              onClick={user ? () => push('/home') : signIn}
              className='welcome-btn'
              name='get started'
              Icon={FaSignInAlt}
            />
          </div>
        </div>

        <div className='hidden w-[400px] pt-12 lg:block'>
          <Image src={avatar} objectFit='contain' alt='trackAsOne avatar' />
        </div>
      </section>

      <section className='my-20 border-y-2 border-primary py-5 md:my-40 md:py-12'>
        <ul className='text-md flex justify-between text-primary text-opacity-90 sm:text-2xl md:text-3xl xl:text-5xl'>
          {['User-Friendly', 'Collaborative', 'Open-Source'].map((i) => (
            <li key={i}>
              <p className='font-serif font-semibold'>{i}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className='mx-auto max-w-screen-xl space-y-24 pb-40 md:space-y-40'>
        <Info
          title='Built by a student for students.'
          body={landingPage.body2}
        />

        <Info title='Why use this task tracker?' body={landingPage.body3} />
      </section>
    </>
  );
};

Index.getLayout = (page: ReactElement) => {
  return (
    <Layout wide allowAll className='pt-20'>
      {page}
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
      <h1 className='font-serif text-xl font-semibold sm:text-2xl lg:text-4xl'>
        {title}
      </h1>
      <p className='text-md mt-2 text-center sm:text-lg lg:w-[490px] xl:w-[670px] xl:text-xl'>
        {body}
      </p>
    </div>
  );
};

export default Index;
