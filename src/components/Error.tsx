import React from 'react';
import Image from 'next/image';
import mascot from '@/assets/404cat.svg';

interface ErrorProps {
  code?: string;
  info?: string;
}

const Error: React.FC<ErrorProps> = ({ code, info }) => {
  return (
    <section className='wrap'>
      <div className='w-[200px] mt-10'>
        <Image src={mascot} objectFit='contain' alt='error cat mascot' />
      </div>
      <h1 className='font-bold text-7xl'>{code}</h1>
      <p className='text-lg'>{info}</p>
    </section>
  );
};

Error.defaultProps = {
  code: '404',
  info: 'page not found',
};

export default Error;
