import React from 'react';
import { useRouter } from 'next/router';

const RoomNav = ({ room }: { room: IRoom }) => {
  const { push } = useRouter();

  return (
    <nav className='flex justify-evenly text-sm p-2 bg-secondary w-full rounded-b-[16px]'>
      <button type='button' onClick={() => push(`${room.id}?tab=info`)}>
        <a>room info</a>
      </button>

      <p>{room.name}</p>

      <button type='button' onClick={() => push(`${room.id}?tab=invite`)}>
        <a>invite user</a>
      </button>
    </nav>
  );
};

export default RoomNav;
