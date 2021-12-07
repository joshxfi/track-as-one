import React from 'react';
import { useRouter } from 'next/router';

interface RoomLabelProps {
  rooms: IRoom[];
  label: string;
  limit: string;
}

const RoomLabel = ({ rooms, label, limit }: RoomLabelProps) => {
  const { push } = useRouter();

  return (
    <button
      type='button'
      onClick={() => push(`/${label.toLowerCase()}`)}
      className='w-full primary-gradient text-primary rounded py-1 px-[30px] text-sm font-medium flex-between hover:shadow-lg transition-shadow'
    >
      <h2 className='font-medium'>
        {rooms?.length} out of {limit} rooms
      </h2>

      <p>{label} &rarr;</p>
    </button>
  );
};

export default RoomLabel;
