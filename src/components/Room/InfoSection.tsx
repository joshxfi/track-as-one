import React from 'react';
import { IconType } from 'react-icons';

interface InfoSectionProps {
  onClick?: () => void;
  title: string;
  label: string;
  Icon: IconType;
}

const InfoSection = ({ onClick, title, label, Icon }: InfoSectionProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`card flex-between h-[70px] mb-2 w-full text-left ${
        !onClick && 'cursor-default'
      }`}
    >
      <div className='leading-5'>
        <p className='text-f9'>{title}</p>
        <p className='text-sm'>{label}</p>
      </div>

      <Icon className='icon text-xl' />
    </button>
  );
};

export default InfoSection;
