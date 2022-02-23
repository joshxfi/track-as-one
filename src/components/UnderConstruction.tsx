import React from 'react';

const UnderConstruction = () => {
  const version = process.env.NEXT_PUBLIC_VERSION ?? 'v0.0.0';

  return (
    <>
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
      <h1 className='about-h1'>🚧 This page is under construction 🚧</h1>
    </>
  );
};

export default UnderConstruction;
