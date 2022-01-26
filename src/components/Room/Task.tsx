import React from 'react';
import { TaskBtn } from '@/components/Button';
import { IoCloseCircle } from 'react-icons/io5';
import { BsFillCheckCircleFill } from 'react-icons/bs';

interface RoomTaskProps {
  task: ITask;
  members: number;
  isAdmin: boolean;
  taskDone: (id: string) => void;
  taskDel: (id: string) => void;
}

const RoomTask: React.FC<RoomTaskProps> = ({
  task,
  members,
  isAdmin,
  taskDone,
  taskDel,
}) => {
  return (
    <div
      className={`w-full text-left leading-5 relative px-[30px] min-h-[70px] py-4 bg-primary text-secondary rounded transition-all duration-300 flex items-start group overflow-hidden cursor-default ${
        isAdmin ? 'hover:px-16' : 'hover:pl-16'
      }`}
    >
      <TaskBtn
        onClick={() => taskDone(task.id ?? '')}
        className='bg-green-500 text-green-500 -left-14 group-hover:left-0 rounded-tl rounded-bl'
        Icon={BsFillCheckCircleFill}
      />

      {isAdmin && (
        <TaskBtn
          onClick={() => taskDel(task.id ?? '')}
          className='bg-red-500 text-red-500 -right-14 group-hover:right-0'
          Icon={IoCloseCircle}
          iconStyle='text-xl'
        />
      )}

      <div className='w-full'>
        <p className='text-f9 break-words text-sm md:text-base'>
          {task.description}
        </p>
        <div className='text-xs md:text-sm pt-2 flex-between'>
          <p>
            {task.dueDate
              ? task.dueDate.toDate().toLocaleDateString([], {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
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
