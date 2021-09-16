import React from 'react';
import { Header } from '../components/Header';
import { VscSignIn } from 'react-icons/vsc';

const Join = () => {
  return (
    <section className='wrap'>
      <Header title='Join a Room' />
      <form className='w-full flex justify-center flex-col'>
        <input
          className='h-[36px] bg-inputbg rounded-[36px] px-[20px] text-sm outline-none border-2 focus:border-primary'
          type='text'
          placeholder='enter room id'
        />
        <div className='inline-block mx-auto mt-6'>
          <button className='btn'>
            <p className='mr-4'>join room</p>
            <VscSignIn className='icon' />
          </button>
        </div>
      </form>
    </section>
  );
};

export default Join;
