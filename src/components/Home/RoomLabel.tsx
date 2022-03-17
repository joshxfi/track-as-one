import React from 'react';
import Tippy from '@tippyjs/react';
import { useRouter } from 'next/router';

interface RoomLabelProps {
  roomLength: number;
  label: string;
  limit: string;
}

const RoomLabel = ({ roomLength, label, limit }: RoomLabelProps) => {
  const { push } = useRouter();

  return (
    <Tippy content={`${label} Room`} placement='right'>
      <button
        type='button'
        onClick={() => push(`/${label.toLowerCase()}`)}
        className='primary-gradient flex-between w-full rounded py-1 px-[30px] text-sm font-medium text-primary transition-shadow hover:shadow-lg'
      >
        <h2 className='font-medium'>
          {roomLength} out of {limit} rooms
        </h2>

        <p>{label} &rarr;</p>
      </button>
    </Tippy>
  );
};

export default RoomLabel;
