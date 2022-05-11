import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { FaSignInAlt } from 'react-icons/fa';

import avatar from '@/assets/avatar.svg';
import { Button } from '@/components/Button';
import { landingPage } from '@/utils/constants';
import { NextPageWithLayout } from 'types/page';
import { ImageFill, Layout } from '@/components';
import { useAuth } from '@/contexts/AuthContext';

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
              <ImageFill
                contain
                priority
                src={avatar}
                alt='trackAsOne avatar'
                className='my-8 mx-auto h-[300px] w-[300px] lg:hidden'
              />

              <h1 className='font-serif text-2xl font-medium xl:w-auto xl:text-3xl'>
                A free and open-source collaborative task tracker.
              </h1>

              <p className='text-md my-8 text-lg lg:w-[540px] xl:w-[650px]'>
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

        <ImageFill
          contain
          priority
          src={avatar}
          alt='trackAsOne avatar'
          className='hidden h-[500px] w-[500px] lg:block'
        />
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
    <div className='mx-auto rounded border-t-[3px] border-l-[3px] border-r-[6px] border-b-[6px] border-primary bg-white md:w-[700px]'>
      <div className='h-12 border-b-[3px] border-primary bg-secondary' />
      <div className='p-8 text-center md:p-16'>
        <h1 className='mb-4 font-serif text-2xl font-medium md:text-4xl'>
          {title}
        </h1>
        <p className='text-md mt-2 text-center md:text-lg'>{body}</p>
      </div>
    </div>
  );
};

export default Index;
