import React from 'react';
import Link from 'next/link';
import { Layout } from '@/components';
import { aboutPage } from '@/utils/constants';

const About = () => {
  const version = process.env.NEXT_PUBLIC_VERSION;

  return (
    <Layout className='py-14' xl allowAll>
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
          <p>{aboutPage.reason}</p>
        </div>

        <div>
          <h1 className='about-h1'>Future Updates</h1>
          <ul>
            {aboutPage.futures.map((update) => (
              <li key={update}>▸ {update}</li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className='about-h1'>Contribute</h1>
          <ul>
            <li>
              <Link href='/contact'>
                <a className='text-blue-500'>▸ Report Bugs</a>
              </Link>
            </li>
            <li>
              <Link href='/contact'>
                <a className='text-blue-500'>▸ Request Feature</a>
              </Link>
            </li>
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
    </Layout>
  );
};

export default About;
