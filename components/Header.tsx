import React from 'react';

export const Header: React.FC<HeaderProps> = ({ title, desc }) => {
  return (
    <header className='mt-12 text-center mb-4'>
      <h1 className='text-5xl font-bold'>{title}</h1>
      <i className='text-base'>{desc}</i>
    </header>
  );
};

Header.defaultProps = {
  title: 'trackAsOne',
  desc: 'organize your tasks as one',
};