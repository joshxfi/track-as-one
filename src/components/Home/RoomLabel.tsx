import React from 'react';
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';

interface RoomLabelProps {
  label: string;
  text: string;
  Icon: IconType;
}

const RoomLabel = ({ label, text, Icon }: RoomLabelProps) => {
  const { push } = useRouter();

  return (
    <>
      <div className='mb-4 flex items-center space-x-4 text-gray-800'>
        <button
          type='button'
          onClick={() => push(`/${label.toLowerCase()}`)}
          className='flex items-center space-x-2'
        >
          <Icon className='text-lg' />
          <p>{label}</p>
        </button>

        <div className='h-[15px] w-[1px] bg-gray-400' />

        <h2>{text}</h2>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
    </>
  );
};

export default RoomLabel;
