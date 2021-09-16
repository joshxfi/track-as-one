import React from 'react';
import { AiOutlineIdcard } from 'react-icons/ai';
import { BsCalendarFill } from 'react-icons/bs';
import { Header } from '../../components/Header';
import { RoomNav } from '../../components/RoomNav';

interface RoomListSchema {
  roomName: string;
  members: string;
}

const roomList: RoomListSchema[] = [
  { roomName: 'John Doe', members: 'creator' },
  { roomName: 'Mr. Robot', members: 'admin' },
  { roomName: 'Joe Mama', members: 'member' },
];

const RoomInfo: React.FC = () => {
  return (
    <section className='wrap'>
      <RoomNav />
      <Header title='Room Info' desc='' />

      <div className='flex justify-between items-center px-[30px] h-[70px] rounded-lg mb-2 bg-primary text-secondary w-full'>
        <div className='leading-5'>
          <p className='text-f9'>September 13, 2021</p>
          <p className='text-sm'>room created</p>
        </div>

        <BsCalendarFill className='icon' />
      </div>

      <div className='w-full mb-4'>
        {roomList.map(room => (
          <div className='flex justify-between items-center px-[30px] h-[70px] rounded-lg mb-2 bg-primary text-secondary'>
            <div className='flex'>
              <div className='h-9 w-9 bg-secondary rounded-full mr-4'></div>
              <div className='leading-5'>
                <p className='text-f9'>{room.roomName}</p>
                <p className='text-sm'>members: {room.members}</p>
              </div>
            </div>

            <AiOutlineIdcard className='icon text-xl' />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomInfo;
