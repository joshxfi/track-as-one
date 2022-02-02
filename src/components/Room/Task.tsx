import React, { useState } from 'react';

import toast from 'react-hot-toast';
import { FaLink } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import { BsFillCheckCircleFill } from 'react-icons/bs';

import { Modal } from '@/components';
import { db } from '@/config/firebase';
import { SideBtn } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore';

interface RoomTaskProps {
  task: ITask;
  room: IRoom;
}

const RoomTask: React.FC<RoomTaskProps> = ({ task, room }) => {
  const [delModal, setDelModal] = useState(false);
  const [urlModal, setUrlModal] = useState(false);
  const { data } = useAuth();

  const isAdmin = room.creator === data.id;

  const taskDone = async (id?: string) => {
    const taskRef = doc(db, `rooms/${room?.id}/tasks/${id}`);
    await updateDoc(taskRef, {
      completedBy: arrayUnion(data.id),
    });

    toast.success('Task Completed');
  };

  const taskDel = (id?: string) => {
    setDelModal(false);
    setTimeout(() => {
      toast.promise(deleteDoc(doc(db, `rooms/${room?.id}/tasks/${id}`)), {
        loading: 'Deleting Task...',
        success: 'Task Deleted',
        error: 'Error Deleting Task',
      });
    }, 300);
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
      <Modal
        title='Delete Task'
        description='Are you sure you want to delete this task? This action cannot be undone.'
        proceed={() => taskDel(task.id)}
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

      <SideBtn
        onClick={() => taskDone(task.id)}
        buttonType='check'
        Icon={BsFillCheckCircleFill}
      />

      {isAdmin && (
        <SideBtn
          onClick={() => setDelModal(true)}
          buttonType='close'
          Icon={IoCloseCircle}
          iconStyle='text-xl'
        />
      )}

      {task.url && (
        <button
          onClick={() => setUrlModal(true)}
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
            Done: {task.completedBy?.length}/{room?.members?.length + 1}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomTask;
