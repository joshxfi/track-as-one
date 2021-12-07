import React from 'react';
import { useRouter } from 'next/router';
import { VscSignIn } from 'react-icons/vsc';

interface NoRoomsProps {
  desc: string;
  href: string;
}

export const NoRooms: React.FC<NoRoomsProps> = ({ desc, href }) => {
  const router = useRouter();

  return (
    <button
      type='button'
      onClick={() => router.push(href)}
      className='flex px-[30px] justify-between h-[70px] w-full items-center bg-primary text-f9 text-center rounded btn-ring'
    >
      <h2>{desc}</h2>
      <VscSignIn className='icon' />
    </button>
  );
};

export default NoRooms;
