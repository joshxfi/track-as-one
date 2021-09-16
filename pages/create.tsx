import React from 'react';
import { Header } from '../components/Header';
import { BiDoorOpen } from 'react-icons/bi';

const Create = () => {
  return (
    <section className='wrap'>
      <Header title='Create a Room' />
      <form className='w-full flex justify-center flex-col'>
        <input
          className='h-[36px] bg-inputbg rounded-[36px] px-[20px] text-sm outline-none border-2 focus:border-primary'
          type='text'
          placeholder='enter room name'
        />
        <div className='inline-block mx-auto mt-6'>
          <button className='btn'>
            <p className='mr-4'>create room</p>
            <BiDoorOpen className='icon' />
          </button>
        </div>
      </form>
    </section>
  );
};

export default Create;
