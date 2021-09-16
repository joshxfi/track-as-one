import React from 'react';
import { Header } from '../components/Header';
import { AiOutlineIdcard } from 'react-icons/ai';
import { RoomNav } from '../components/RoomNav';

const Invite = () => {
  return (
    <section className='wrap'>
      <RoomNav />
      <Header title='Invite a User' />
      <form className='w-full flex justify-center flex-col'>
        <input
          className='h-[36px] bg-inputbg rounded-[36px] px-[20px] text-sm outline-none border-2 focus:border-primary'
          type='text'
          placeholder='enter user id'
        />
        <div className='inline-block mx-auto mt-6'>
          <button className='btn'>
            <p className='mr-4'>invite user</p>
            <AiOutlineIdcard className='icon' />
          </button>
        </div>
      </form>
    </section>
  );
};

export default Invite;
