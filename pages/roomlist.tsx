import React from 'react';
import { Header } from '../components/Header';
import { BiDoorOpen } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import Link from 'next/link';

interface RoomListSchema {
  roomName: string;
  members: number;
}

const roomList: RoomListSchema[] = [
  { roomName: "John Doe's Room", members: 4 },
  { roomName: 'Personal Room', members: 1 },
  { roomName: "Class's Room", members: 17 },
];

const Rooms = () => {
  return (
    <section className='wrap'>
      <Header title='My Rooms List' />
      <div className='w-full mb-4'>
        {roomList.map(room => (
          <div className='flex justify-between items-center px-[30px] h-[70px] rounded-lg mb-2 bg-primary text-secondary'>
            <div className='leading-5'>
              <p className='text-f9'>{room.roomName}</p>
              <p className='text-sm'>members: {room.members}</p>
            </div>

            <BiDoorOpen className='icon' />
          </div>
        ))}
      </div>

      <Link href='/invites' passHref>
        <button className='btn'>
          <p className='mr-4'>view invites</p>
          <BsEye className='icon' />
        </button>
      </Link>
    </section>
  );
};

export default Rooms;
