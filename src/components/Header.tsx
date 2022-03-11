import React from 'react';
import { useRouter } from 'next/router';
import { TiArrowBack } from 'react-icons/ti';

interface HeaderProps {
  title: string;
  desc?: string;
  backBtn?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, desc, backBtn }) => {
  const { back } = useRouter();

  return (
    <header className='relative mt-12 mb-4 text-center'>
      {backBtn && (
        <button
          type='button'
          onClick={back}
          className='absolute top-0 left-0 text-4xl'
        >
          <TiArrowBack />
        </button>
      )}
      <h1 className='text-5xl font-bold md:text-7xl'>{title}</h1>
      <i className='text-base md:text-xl'>{desc}</i>
    </header>
  );
};

export default Header;
