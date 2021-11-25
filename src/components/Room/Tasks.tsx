import React, { useState } from 'react';
import { BsXSquareFill } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/Button';

interface RoomTaskProps {
  task: ITask;
  memberCount: number;
}

const RoomTask: React.FC<RoomTaskProps> = ({ task, memberCount }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { dueDate } = task;

  const optionsVariant = {
    init: {
      y: -70,
      opacity: 0,
    },

    animate: {
      y: 0,
      opacity: 1,
    },

    exit: {
      y: -70,
      opacity: 0,
    },
  };

  return (
    <motion.div className='relative mb-2'>
      <button
        type='button'
        onClick={() => setShowOptions(!showOptions)}
        className='w-full text-left leading-5 relative z-10 px-[30px] min-h-[70px] py-4 bg-primary text-secondary rounded-lg cursor-pointer hover:bg-opacity-95 transition-all duration-300'
      >
        <p className='text-f9 break-all'>{task.description}</p>
        <div className='text-sm pt-2 flex-between'>
          <p>
            {dueDate
              ? `Due - ${dueDate.toDate().toDateString()}`
              : 'No Due Date'}
          </p>
          <p>
            Done [{task.completedBy?.length}/{memberCount}]
          </p>
        </div>
      </button>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            variants={optionsVariant}
            initial='init'
            animate='animate'
            exit='exit'
            transition={{ duration: 0.5 }}
            className='flex-between mt-2 mb-4 w-full'
          >
            <Button Icon={CheckIcon} name='done' className='mr-2 task-btn' />

            <Button
              Icon={BsXSquareFill}
              name='delete'
              className='task-btn'
              iconStyles='text-2xl'
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='currentColor'
      viewBox='0 0 16 16'
      className='mr-2'
    >
      <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z' />
    </svg>
  );
};

export default RoomTask;
