import React from 'react';
import { Header } from '../../components/Header';
import { BsPlusSquareFill, BsCalendarFill, BsTrashFill } from 'react-icons/bs';
import { RoomNav } from '../../components/RoomNav';

interface TaskSchema {
  description: string;
  due: number;
}

const roomList: TaskSchema[] = [
  { description: "John Doe's Room", due: 4 },
  { description: 'Personal Room', due: 1 },
  { description: "Class's Room", due: 17 },
];

const Room = () => {
  return (
    <section className='wrap'>
      <RoomNav />
      <Header title='John Doe Room' desc='' />
      <form className='w-full'>
        <div className='flex justify-between items-center px-[30px] rounded-lg bg-inputbg text-primary placeholder-inputfg focus-within:border-primary border-2'>
          <input
            type='text'
            placeholder='task description'
            className='bg-inputbg h-[45px] outline-none w-full pr-4'
          />
          <div className='text-primary text-2xl flex'>
            <BsCalendarFill className='mr-2' />
            <BsPlusSquareFill />
          </div>
        </div>
      </form>

      <div className='w-full my-4'>
        {roomList.map(room => (
          <div
            key={room.description}
            className='flex justify-between items-center px-[30px] h-[70px] rounded-lg mb-2 bg-primary text-secondary'
          >
            <div className='leading-5'>
              <p className='text-f9'>{room.description}</p>
              <p className='text-sm'>members: {room.due}</p>
            </div>

            <BsTrashFill className='icon' />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Room;
