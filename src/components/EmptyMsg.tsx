import React from 'react';
import { useRouter } from 'next/router';

interface EmptyProps {
  empty: string;
}

const EmptyMsg = ({ empty }: EmptyProps) => {
  const { back } = useRouter();

  return (
    <div className='flex items-center justify-center mt-4 text-lg'>
      <h2>No {empty} received.</h2>
      &nbsp;
      <button
        type='button'
        onClick={() => back()}
        className='underline text-blue-600'
      >
        Go Back?
      </button>
    </div>
  );
};

export default EmptyMsg;
