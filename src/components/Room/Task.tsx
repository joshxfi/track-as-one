import React, { useState } from 'react';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import { MdMoreVert } from 'react-icons/md';

import { Modal } from '@/components';
import { db, storage } from '@/config/firebase';
import { useAuth } from '@/context/AuthContext';
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { dateWithTime } from '@/utils/functions';
import { defaultPic } from '@/utils/constants';
import { deleteObject, ref } from 'firebase/storage';

interface RoomTaskProps {
  task: ITask;
  room: IRoom;
}

const RoomTask: React.FC<RoomTaskProps> = ({ task, room }) => {
  const [delModal, setDelModal] = useState(false);
  const [urlModal, setUrlModal] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);

  const [displayImage, setDisplayImage] = useState('');
  const [displayImageModal, setDisplayImageModal] = useState(false);

  const { data } = useAuth();
  const isAdmin = room.creator === data.id;
  const taskRef = doc(db, `rooms/${room?.id}/tasks/${task.id}`);
  const completedByUser = task.completedBy.includes(data.id ?? '');

  const hasImg = task.imgUrls && task.imgUrls?.length > 0;

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

      if (task.imgUrls && task.imgUrls?.length > 0) {
        task.imgUrls.forEach(async (url) => {
          await deleteObject(ref(storage, url));
        });
      }
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

  const nearDeadline = () => {
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    if (task.dueDate && task.dueDate.toDate() <= threeDaysFromNow) {
      return true;
    }

    return false;
  };

  const pastDeadline = () => {
    const today = new Date();
    if (today > task.dueDate?.toDate()) {
      return true;
    }

    return false;
  };

  const displayIndicator = () => {
    if (data.id && task.completedBy.includes(data.id)) return 'bg-green-500';
    if (pastDeadline()) return 'bg-red-500';
    if (nearDeadline()) return 'bg-secondary';
    return 'bg-gray-400';
  };

  return (
    <div className='flex flex-col'>
      <div
        className={`relative min-h-[70px] w-full bg-primary p-4 px-6 text-secondary md:px-7 ${
          hasImg ? 'rounded-t' : 'rounded'
        } group cursor-default overflow-hidden transition-all duration-300 hover:pr-14`}
      >
        <div
          className={`absolute left-0 top-0 h-full p-1 ${displayIndicator()}`}
        />

        <Modal
          title='Delete Task'
          description='Are you sure you want to delete this task? This action cannot be undone.'
          proceed={taskDel}
          setIsOpen={setDelModal}
          isOpen={delModal}
        />

        <Modal
          title='Visit URL'
          description={`Are you sure you want to go to this URL? ${task.url}`}
          href={task.url}
          setIsOpen={setUrlModal}
          isOpen={urlModal}
        />

        <Modal
          title='Task Info'
          isOpen={optionsModal}
          setIsOpen={setOptionsModal}
          body={
            <div className='mt-2 space-y-2 pb-4 text-sm text-gray-800 md:text-base'>
              <hr className='my-4' />

              {taskInfo.map((val) => (
                <div
                  key={nanoid()}
                  className='flex justify-between space-x-4 text-right'
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
                  className='modal-btn bg-red-500 text-white'
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
                  className='modal-btn bg-amber-500 text-white'
                >
                  Go to URL
                </button>
              )}

              <button
                onClick={taskDone}
                type='button'
                className='modal-btn bg-green-500 text-white'
              >
                {completedByUser ? 'Undo' : 'Done'}
              </button>
            </>
          }
        />

        <button
          onClick={() => setOptionsModal(true)}
          className='absolute top-0 -right-14 flex h-full w-10 items-center justify-center bg-secondary text-2xl transition-all duration-300 group-hover:right-0 group-hover:text-white'
          type='button'
        >
          <MdMoreVert />
        </button>
        <div className='w-full'>
          <p className='break-words text-sm text-f9 md:text-base'>
            {task.description}
          </p>
          <div className='flex-between pt-2 text-xs md:text-sm'>
            <p>
              {task.dueDate
                ? dateWithTime(task.dueDate.toDate())
                : 'No Due Date'}
            </p>
            <p>
              Done: {task.completedBy?.length}/{room?.members?.length + 1}
            </p>
          </div>
        </div>
      </div>
      <Modal
        empty
        isOpen={displayImageModal}
        setIsOpen={() => setDisplayImageModal(false)}
        body={
          <div className='grid w-screen max-w-screen-md place-items-center md:mr-4'>
            <img
              src={displayImage ?? defaultPic}
              className='w-[90%] rounded object-contain md:w-full'
              alt='task img'
            />
          </div>
        }
      />

      {task.imgUrls && task.imgUrls?.length > 0 && (
        <div className='flex space-x-1 rounded-b bg-primary bg-opacity-90 p-1 sm:space-x-2 sm:p-2'>
          {task.imgUrls.map((url) => (
            <button
              type='button'
              onClick={() => {
                setDisplayImage(url);
                setDisplayImageModal(true);
              }}
              className='relative h-14 w-14 sm:h-20 sm:w-20'
            >
              <Image
                src={url ?? defaultPic}
                layout='fill'
                objectFit='cover'
                className='rounded'
                alt='task img'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomTask;
