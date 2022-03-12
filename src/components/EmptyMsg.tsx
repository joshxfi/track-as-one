import React from 'react';
import { useRouter } from 'next/router';

interface EmptyProps {
  empty: string;
}

const EmptyMsg = ({ empty }: EmptyProps) => {
  const { back } = useRouter();

  return (
    <div className='mt-4 flex items-center justify-center text-lg'>
      <h2>No {empty} received.</h2>
      &nbsp;
      <button type='button' onClick={back} className='text-blue-600 underline'>
        Go Back?
      </button>
    </div>
  );
};

export default EmptyMsg;
