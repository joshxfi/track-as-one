import React from 'react';
import Link from 'next/link';

interface RoomLabelProps {
  rooms: IRoom[];
  label: string;
  limit: string;
}

const RoomLabel = ({ rooms, label, limit }: RoomLabelProps) => {
  return (
    <div className='room-label'>
      <h2 className='font-medium'>
        {rooms?.length}/{limit}
      </h2>

      <Link href={label}>
        <a>{label.toUpperCase()} &rarr;</a>
      </Link>
    </div>
  );
};

export default RoomLabel;
