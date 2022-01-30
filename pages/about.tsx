import React from 'react';
import Link from 'next/link';
import { Layout } from '@/components';
import { aboutPage } from '@/utils/constants';

const About = () => {
  return (
    <Layout className='py-14' xl allowAll>
      <div className='flex space-x-2'>
        <h2>v1.0.0</h2>
        <a className='text-blue-500' href='#'>
          View Changelog
        </a>
      </div>

      <hr className='my-6' />

      <section className='space-y-12'>
        <div>
          <h1 className='text-3xl font-semibold mb-4'>Why Build This?</h1>
          <p>{aboutPage.reason}</p>
        </div>

        <div>
          <h1 className='text-3xl font-semibold mb-4'>Future Updates</h1>
          <ul>
            {aboutPage.futures.map((update) => (
              <li>▸ {update}</li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className='text-3xl font-semibold mb-4'>Contribute</h1>
          <ul>
            <li>
              <Link href='/contact/#bug_report'>
                <a className='text-blue-500'>▸ Report Bugs</a>
              </Link>
            </li>
            <li>
              <Link href='/contact/#feature_request'>
                <a className='text-blue-500'>▸ Request Feature</a>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default About;
