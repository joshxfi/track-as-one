import React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';

interface RoomTaskProps {
  task: ITask;
  members: number;
  taskDone: (id: string) => void;
}

const RoomTask: React.FC<RoomTaskProps> = ({ task, members, taskDone }) => {
  return (
    <div className='w-full text-left leading-5 relative px-[30px] min-h-[70px] py-4 bg-primary text-secondary rounded cursor-pointer transition-all duration-300 flex items-start group hover:pl-16'>
      <button
        onClick={() => taskDone(task.id ?? '')}
        className='bg-green-500 absolute h-full top-0 left-0 text-green-500 rounded-tl rounded-bl group-hover:px-4 group-hover:text-white transition-all duration-300'
        type='button'
      >
        <BsFillCheckCircleFill />
      </button>
      <div className='w-full'>
        <p className='text-f9 break-all'>{task.description}</p>
        <div className='text-sm pt-2 flex-between'>
          <p>
            {task.dueDate
              ? `Due - ${task.dueDate.toDate().toDateString()}`
              : 'No Due Date'}
          </p>
          <p>
            Done: {task.completedBy?.length}/{members}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomTask;
