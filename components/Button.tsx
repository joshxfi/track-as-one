import React from 'react';
import { useRouter } from 'next/router';

export const Button = ({ desc, href, Icon }: ButtonProps) => {
  const router = useRouter();

  return (
    <button onClick={() => router.push(href || '')} className='btn'>
      <p className='mr-4'>{desc}</p>
      <Icon className='icon' />
    </button>
  );
};
