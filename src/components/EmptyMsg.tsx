import React from 'react';
import Link from 'next/link';

interface EmptyProps {
  empty: string;
  href: string;
}

const EmptyMsg = ({ empty, href }: EmptyProps) => {
  return (
    <div className='flex items-center justify-center mt-4 text-lg'>
      <h2>No {empty} received.</h2>
      &nbsp;
      <Link href={href}>
        <a className='font-medium'>Go Back?</a>
      </Link>
    </div>
  );
};

export default EmptyMsg;
