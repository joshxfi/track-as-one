import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const RoomNav = ({ room }: { room: IRoom }) => {
  const { push } = useRouter();
  const { id } = room;

  return (
    <nav className='flex justify-evenly text-sm p-2 bg-secondary w-full rounded-b-[16px]'>
      <button type='button' onClick={() => push(`${id}?tab=info`)}>
        <a>room info</a>
      </button>

      <Link href={`/rooms/${id}`}>
        <a>{room.name}</a>
      </Link>

      <button type='button' onClick={() => push(`${id}?tab=invite`)}>
        <a>invite user</a>
      </button>
    </nav>
  );
};

export default RoomNav;
