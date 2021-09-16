import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  desc: string;
  Icon: IconType;
}

export const Button = ({ desc, Icon }: ButtonProps) => {
  return (
    <button className='btn'>
      <p className='mr-4'>{desc}</p>
      <Icon className='icon' />
    </button>
  );
};
