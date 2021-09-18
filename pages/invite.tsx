import React from 'react';
import { Header } from '../components/global/Header';
import { AiOutlineIdcard } from 'react-icons/ai';
import { RoomNav } from '../components/room/RoomNav';
import { Button } from '../components/global/Button';

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
          <Button desc='invite user' Icon={AiOutlineIdcard} />
        </div>
      </form>
    </section>
  );
};

export default Invite;
