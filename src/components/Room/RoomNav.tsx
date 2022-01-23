import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const RoomNav = ({ room }: { room: IRoom }) => {
  const router = useRouter();
  const { id } = room;

  const handleRoute = (tab: string) => {
    router.push({ query: { ...router.query, tab } });
  };

  return (
    <nav className='flex justify-evenly text-sm p-2 bg-secondary w-full rounded-b-[16px]'>
      <button type='button' onClick={() => handleRoute('info')}>
        <a>room info</a>
      </button>

      <Link href={`/room/${encodeURIComponent(id ?? '')}`}>
        <a>{room.name}</a>
      </Link>

      <button type='button' onClick={() => handleRoute('invite')}>
        <a>invite user</a>
      </button>
    </nav>
  );
};

export default RoomNav;
