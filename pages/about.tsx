import React, { ReactElement } from 'react';

import { Layout } from '@/components';
import { aboutPage } from '@/utils/constants';
import { NextPageWithLayout } from '@/types/page';

const About: NextPageWithLayout = () => {
  const version = process.env.NEXT_PUBLIC_VERSION;

  return (
    <>
      <div className='flex space-x-2'>
        <h2>{version}</h2>
        <a
          className='text-blue-500'
          href={`https://github.com/joshxfi/trackAsOne/releases/tag/${version}`}
          target='_blank'
          rel='noreferrer noopener'
        >
          View Changelog
        </a>
      </div>

      <hr className='my-6' />

      <section className='space-y-12'>
        <div>
          <h1 className='about-h1'>Why Build This?</h1>
          <p>{aboutPage.body1}</p>
        </div>

        <div>
          <h1 className='about-h1'>Future Updates</h1>
          <ul>
            {aboutPage.body2.map((update) => (
              <li key={update}>▸ {update}</li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className='about-h1'>License</h1>
          <p>
            This project is licensed under{' '}
            <a
              className='text-blue-500'
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/joshxfi/trackAsOne/blob/main/LICENSE'
            >
              MIT
            </a>
          </p>
        </div>
      </section>
    </>
  );
};

About.getLayout = (page: ReactElement) => (
  <Layout className='py-14' wide allowAll>
    {page}
  </Layout>
);

export default About;
