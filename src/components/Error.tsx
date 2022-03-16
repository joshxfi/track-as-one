import React from 'react';
import Image from 'next/image';
import mascot from '@/assets/404cat.svg';

interface ErrorProps {
  code?: string;
  info?: string;
}

const Error = ({ code = '404', info = 'page not found' }: ErrorProps) => {
  return (
    <section className='flex flex-col items-center'>
      <div className='mt-10 w-[200px]'>
        <Image src={mascot} objectFit='contain' alt='error cat mascot' />
      </div>
      <h1 className='text-7xl font-bold'>{code}</h1>
      <p className='text-lg'>{info}</p>
    </section>
  );
};

export default Error;
