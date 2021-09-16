import React from 'react';
import Link from 'next/link';

export const RoomNav: React.FC = () => {
  return (
    <nav className='flex justify-evenly text-sm p-2 bg-secondary w-full rounded-b-[16px]'>
      <Link href='/roominfo/:id'>
        <a>room info</a>
      </Link>

      <p>members: 10</p>

      <Link href='/invite'>
        <a>invite user</a>
      </Link>
    </nav>
  );
};
