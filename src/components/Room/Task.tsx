/* eslint-disable no-unused-vars */
import React from 'react';
import toast from 'react-hot-toast';
import { FaLink } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import { BsFillCheckCircleFill } from 'react-icons/bs';

import { Popup } from '@/components/Room';
import { SideBtn } from '@/components/Button';

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
  const goToLink = () => {
    toast((t) => (
      <Popup
        href={task.url}
        proceed={() => toast.dismiss(t.id)}
        dismiss={() => toast.dismiss(t.id)}
        title={
          <div className='text-center'>
            <p>Go to URL?</p>{' '}
            <p className='text-sm underline text-blue-500 break-all'>
              {task.url}
            </p>
          </div>
        }
      />
    ));
  };

  const padding = () => {
    if (isAdmin) {
      if (task.url) return 'hover:pl-16 hover:pr-28';
      return 'hover:px-16';
    }

    if (task.url) return 'hover:px-16';
    return 'hover:pl-16';
  };

  return (
    <div
      className={`w-full relative px-[30px] min-h-[70px] py-4 bg-primary text-secondary rounded transition-all duration-300 group overflow-hidden cursor-default ${padding()}`}
    >
      <SideBtn
        onClick={() => taskDone(task.id ?? '')}
        buttonType='check'
        Icon={BsFillCheckCircleFill}
      />

      {isAdmin && (
        <SideBtn
          onClick={() => taskDel(task.id ?? '')}
          buttonType='close'
          Icon={IoCloseCircle}
          iconStyle='text-xl'
        />
      )}

      {task.url && (
        <button
          onClick={goToLink}
          className={`absolute h-full top-0 w-12 flex justify-center items-center group-hover:text-white transition-all duration-300 bg-yellow-500 text-yellow-500 -right-14 ${
            isAdmin ? 'group-hover:right-12' : 'group-hover:right-0'
          }`}
          type='button'
        >
          <FaLink />
        </button>
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
