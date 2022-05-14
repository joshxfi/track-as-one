import React from 'react';
import { useRouter } from 'next/router';
import { Indicator } from '@/components';
import { BiDoorOpen } from 'react-icons/bi';

interface ListRoomsProps {
  room: IRoom;
}

const ListRooms: React.FC<ListRoomsProps> = ({ room }) => {
  const { push } = useRouter();

  return (
    <button
      type='button'
      onClick={() => push({ pathname: '/room', query: { id: room.id } })}
      className='border-effect btn-ring relative flex h-[80px] w-full transform flex-col justify-center truncate rounded border-primary bg-whiteish p-6 text-left hover:-translate-y-1'
    >
      <p className='font-medium'>{room?.name}</p>
      <div className='flex items-center justify-between'>
        <p className='text-sm'>
          members: {room.members.length + 1 + room.admin.length}
        </p>
        <BiDoorOpen />
      </div>

      {room.requests.length > 0 && <Indicator className='top-2 right-2' />}
    </button>
  );
};

export default ListRooms;
