import React from 'react';

export const Button = ({ desc, Icon }: ButtonProps) => {
  return (
    <button className='btn'>
      <p className='mr-4'>{desc}</p>
      <Icon className='icon' />
    </button>
  );
};
