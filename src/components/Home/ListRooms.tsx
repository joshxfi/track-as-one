import React from 'react';
import { useRouter } from 'next/router';
import { BiDoorOpen } from 'react-icons/bi';

interface ListRoomsProps {
  room: IRoom;
}

const ListRooms: React.FC<ListRoomsProps> = ({ room }) => {
  const { push } = useRouter();

  return (
    <button
      type='button'
      onClick={() => push(`/room/${room.id}`)}
      className='card flex-between h-[70px] mb-2 btn-ring w-full text-left'
    >
      <div className='leading-5'>
        <p className='text-f9'>{room?.name}</p>
        <p className='text-sm'>members: {room.members?.length + 1}</p>
      </div>

      <BiDoorOpen className='icon' />
    </button>
  );
};

export default ListRooms;
