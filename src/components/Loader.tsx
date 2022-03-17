import React from 'react';

const Loader = ({ msg }: { msg?: string }) => {
  return (
    <div className='flex flex-col items-center space-y-8'>
      <div className='flex w-full flex-col items-center justify-center'>
        <span className='load' />
      </div>

      {msg && <p className='text-sm text-gray-700 md:text-base'>{msg}</p>}
    </div>
  );
};

export default Loader;
