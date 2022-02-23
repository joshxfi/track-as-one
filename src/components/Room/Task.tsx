import React, { useState } from 'react';

import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import { MdMoreVert } from 'react-icons/md';

import { Modal } from '@/components';
import { db } from '@/config/firebase';
import { useAuth } from '@/context/AuthContext';
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { dateWithTime } from '@/utils/functions';

interface RoomTaskProps {
  task: ITask;
  room: IRoom;
}

const RoomTask: React.FC<RoomTaskProps> = ({ task, room }) => {
  const [delModal, setDelModal] = useState(false);
  const [urlModal, setUrlModal] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);
  const { data } = useAuth();

  const isAdmin = room.creator === data.id;
  const completedByUser = task.completedBy.includes(data.id ?? '');
  const taskRef = doc(db, `rooms/${room?.id}/tasks/${task.id}`);

  const taskDone = async () => {
    if (completedByUser) {
      await updateDoc(taskRef, {
        completedBy: arrayRemove(data.id),
      });

      toast.success('Undo Successful');
    } else {
      await updateDoc(taskRef, {
        completedBy: arrayUnion(data.id),
      });

      toast.success('Task Completed');
    }
  };

  const taskDel = () => {
    setDelModal(false);
    setTimeout(() => {
      toast.promise(deleteDoc(taskRef), {
        loading: 'Deleting Task...',
        success: 'Task Deleted',
        error: 'Error Deleting Task',
      });
    }, 300);
  };

  const taskInfo = [
    {
      title: 'Description',
      info: task.description,
    },
    {
      title: 'Due Date',
      info: task.dueDate
        ? dateWithTime(task.dueDate.toDate())
        : 'No Due Date Specified',
    },
    {
      title: 'Date Added',
      info: task.dateAdded?.toDate().toDateString(),
    },
    {
      title: 'Added By',
      info: task.addedBy,
    },
    {
      title: 'Completed By',
      info: `${task.completedBy.length} member(s)`,
    },
  ];

  return (
    <div className='w-full relative px-[30px] min-h-[70px] py-4 bg-primary text-secondary rounded transition-all duration-300 group overflow-hidden cursor-default hover:pr-16'>
      <Modal
        title='Delete Task'
        description='Are you sure you want to delete this task? This action cannot be undone.'
        proceed={taskDel}
        dismiss={() => setDelModal(false)}
        isOpen={delModal}
      />

      <Modal
        title='Visit URL'
        description={`Are you sure you want to go to this URL? ${task.url}`}
        href={task.url}
        dismiss={() => setUrlModal(false)}
        isOpen={urlModal}
      />

      <Modal
        title='Task Info'
        isOpen={optionsModal}
        dismiss={() => setOptionsModal(false)}
        body={
          <div className='mt-2 space-y-2 text-gray-800 pb-4 text-sm md:text-base'>
            <hr className='my-4' />

            {taskInfo.map((val) => (
              <div
                key={nanoid()}
                className='flex justify-between text-right space-x-4'
              >
                <p>{val.title}: </p>
                <p>{val.info}</p>
              </div>
            ))}
          </div>
        }
        buttons={
          <>
            {isAdmin && (
              <button
                onClick={() => {
                  setOptionsModal(false);

                  setTimeout(() => {
                    setDelModal(true);
                  }, 500);
                }}
                type='button'
                className='bg-red-600 text-white modal-btn'
              >
                Delete
              </button>
            )}

            {task.url && (
              <button
                onClick={() => {
                  setOptionsModal(false);

                  setTimeout(() => {
                    setUrlModal(true);
                  }, 500);
                }}
                type='button'
                className='bg-amber-500 text-white modal-btn'
              >
                Go to URL
              </button>
            )}

            <button
              onClick={taskDone}
              type='button'
              className='bg-green-600 text-white modal-btn'
            >
              {completedByUser ? 'Undo' : 'Done'}
            </button>
          </>
        }
      />

      <button
        onClick={() => setOptionsModal(true)}
        className='absolute h-full top-0 w-12 flex justify-center items-center group-hover:text-white transition-all duration-300 bg-yellow-500 text-yellow-500 -right-14 group-hover:right-0 text-xl'
        type='button'
      >
        <MdMoreVert />
      </button>

      <div className='w-full'>
        <p className='text-f9 break-words text-sm md:text-base'>
          {task.description}
        </p>
        <div className='text-xs md:text-sm pt-2 flex-between'>
          <p>
            {task.dueDate ? dateWithTime(task.dueDate.toDate()) : 'No Due Date'}
          </p>
          <p>
            Done: {task.completedBy?.length}/{room?.members?.length + 1}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomTask;
