import React from 'react';
import { useRouter } from 'next/router';
import { Indicator } from '@/components';

interface ListRoomsProps {
  room: IRoom;
}

const ListRooms: React.FC<ListRoomsProps> = ({ room }) => {
  const { push } = useRouter();

  return (
    <button
      type='button'
      onClick={() => push({ pathname: '/room', query: { id: room.id } })}
      className='card btn-ring relative flex h-[80px] w-full flex-col justify-center p-6 text-left'
    >
      <p className='text-f9'>{room?.name}</p>
      <p className='text-sm'>
        members: {room.members.length + 1 + room.admin.length}
      </p>

      {room.requests.length > 0 && <Indicator className='top-2 right-2' />}
    </button>
  );
};

export default ListRooms;
