/* eslint-disable react/button-has-type */
import React from 'react';
import { useRouter } from 'next/router';

interface HrefButtonProps extends LinkButtonProps {}

const HrefBtn = ({ desc, href, type, Icon }: HrefButtonProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href ?? '')}
      className='btn btnEffect'
      type={type}
    >
      <p className='mr-4'>{desc}</p>
      <Icon className='icon' />
    </button>
  );
};

export default HrefBtn;
