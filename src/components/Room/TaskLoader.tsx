import React from 'react';
import Loader from '../Loader';

const TaskLoader = ({ msg }: { msg?: string }) => {
  return (
    <div className='fixed top-0 left-0 z-50 grid h-screen w-full place-items-center bg-gray-600/60'>
      <div className='grid h-48 w-48 place-items-center rounded-lg bg-white md:h-52 md:w-52'>
        <Loader msg={msg} />
      </div>
    </div>
  );
};

export default TaskLoader;
