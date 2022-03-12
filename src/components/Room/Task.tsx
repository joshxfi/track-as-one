import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import {
  MdMoreVert,
  MdCheck,
  MdLink,
  MdEdit,
  MdDelete,
  MdUndo,
} from 'react-icons/md';

import { Modal } from '@/components';
import { db, storage } from '@/config/firebase';
import { useAuth } from '@/contexts/AuthContext';
import {
  doc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from 'firebase/firestore';
import { useUserByTag } from '@/services';
import { TaskFields } from '@/components/Room';
import { dateWithTime } from '@/utils/functions';
import { useTaskFields, useUpload } from '@/hooks';
import { deleteObject, ref } from 'firebase/storage';
import { useRoomContext } from '@/contexts/RoomContext';
import { defaultPic, urlRegExp } from '@/utils/constants';

const Task = ({ task }: { task: ITask }) => {
  const [delModal, setDelModal] = useState(false);
  const [urlModal, setUrlModal] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [displayImage, setDisplayImage] = useState('');
  const [displayImageModal, setDisplayImageModal] = useState(false);

  const { props, reset } = useTaskFields(task);
  const upload = useUpload();
  const { description, url, dueDate, images } = props;

  const {
    data: { userTag },
  } = useAuth();
  const { room } = useRoomContext();

  const taskRef = doc(db, `rooms/${room?.id}/tasks/${task.id}`);
  const completedByUser = task.completedBy.includes(userTag ?? '');

  const [taskCreator] = useUserByTag(task.addedBy);
  const [taskEditor] = useUserByTag(task.editedBy);

  const hasImg = useMemo(
    () => task.imgUrls && task.imgUrls?.length > 0,
    [task]
  );

  const canModify = useMemo(() => {
    if (room.creator === userTag || room.admin.includes(userTag)) {
      return true;
    }
    return task.addedBy === userTag;
  }, [task, userTag]);

  const editTask = async () => {
    if (url && !urlRegExp.test(url)) toast.error('Invalid URL');
    else if (!description) toast.error('Task Description is Required');
    else {
      setLoading(true);

      let payload: Partial<ITask> = {
        description,
        editedBy: userTag,
        dateEdited: serverTimestamp(),
        dueDate,
        url,
      };

      if (images.length > 0) {
        const imgUrls = await upload(`rooms/${room.id}/images`, images);
        payload = {
          ...payload,
          imgUrls,
        };
      }

      const taskRef = doc(db, `rooms/${room.id}/tasks/${task.id}`);
      await updateDoc(taskRef, payload);
      toast.success('Task Edited');

      setEditModal(false);
      setTimeout(() => setLoading(false), 300);
    }
  };

  const taskDone = async () => {
    if (completedByUser) {
      await updateDoc(taskRef, {
        completedBy: arrayRemove(userTag),
      });

      toast.success('Undo Successful');
    } else {
      await updateDoc(taskRef, {
        completedBy: arrayUnion(userTag),
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
      title: 'Date Added',
      info: task.dateAdded?.toDate().toDateString(),
    },
    {
      title: 'Added By',
      info: taskCreator.username,
    },
    {
      title: 'Recent Edit',
      info: task.dateEdited?.toDate().toDateString(),
    },
    {
      title: 'Recent Edit By',
      info: taskEditor.username,
    },
  ];

  const nearDeadline = useMemo(() => {
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    if (task.dueDate && task.dueDate.toDate() <= threeDaysFromNow) {
      return true;
    }

    return false;
  }, [task.dueDate]);

  const pastDeadline = useMemo(() => {
    const today = new Date();
    if (today > task.dueDate?.toDate()) {
      return true;
    }

    return false;
  }, [task.dueDate]);

  const displayIndicator = () => {
    if (userTag && task.completedBy.includes(userTag)) return 'bg-green-500';
    if (pastDeadline) return 'bg-red-500';
    if (nearDeadline) return 'bg-secondary';
    return 'bg-gray-400';
  };

  return (
    <div className='flex flex-col'>
      <div
        className={`relative min-h-[70px] w-full bg-primary p-4 px-6 text-secondary md:px-7 ${
          hasImg ? 'rounded-t' : 'rounded'
        } group cursor-default overflow-hidden transition-all duration-300 hover:pr-12`}
      >
        <div className={`task-indicator ${displayIndicator()}`} />

        <TaskFields
          {...props}
          proceed={editTask}
          title='Edit Task'
          proceedText='Edit'
          isOpen={editModal}
          setIsOpen={setEditModal}
          isLoading={loading}
          onDismiss={reset}
        />
        <Modal
          title='Delete Task'
          description='Are you sure you want to delete this task? This action cannot be undone.'
          setIsOpen={setDelModal}
          isOpen={delModal}
          buttons={
            <button
              type='button'
              onClick={taskDel}
              className='modal-btn bg-red-600'
            >
              Delete
            </button>
          }
        />

        <Modal
          title='Visit URL'
          body={
            <div>
              <p className='text-gray-500'>
                Are you sure you want to go to this URL?
              </p>
              <p className='text-blue-500 underline'>{task.url}</p>
            </div>
          }
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

              {taskInfo.map(
                (val) =>
                  val.info && (
                    <div
                      key={nanoid()}
                      className='flex justify-between space-x-4 text-right'
                    >
                      <p>{val.title}: </p>
                      <p>{val.info}</p>
                    </div>
                  )
              )}
            </div>
          }
          buttons={
            <>
              {canModify && (
                <>
                  <button
                    onClick={() => {
                      setOptionsModal(false);

                      setTimeout(() => {
                        setDelModal(true);
                      }, 500);
                    }}
                    type='button'
                    className='task-option-btn bg-red-600 text-white'
                  >
                    <MdDelete />
                  </button>

                  <button
                    onClick={() => {
                      setOptionsModal(false);

                      setTimeout(() => {
                        setEditModal(true);
                      }, 500);
                    }}
                    type='button'
                    className='task-option-btn bg-blue-600 text-white'
                  >
                    <MdEdit />
                  </button>
                </>
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
                  className='task-option-btn bg-amber-500 text-white'
                >
                  <MdLink />
                </button>
              )}

              <button
                onClick={taskDone}
                type='button'
                className='task-option-btn bg-green-600 text-white'
              >
                {completedByUser ? <MdUndo /> : <MdCheck />}
              </button>
            </>
          }
        />

        <button
          onClick={() => setOptionsModal(true)}
          className='absolute top-0 -right-14 flex h-full w-8 items-center justify-center bg-secondary text-2xl transition-all duration-300 group-hover:right-0 group-hover:text-white'
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
              Done: {task.completedBy?.length}/
              {room.members.length + 1 + room.admin.length}
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
        <div className='relative flex space-x-1 rounded-b bg-primary bg-opacity-90 py-1 px-4 sm:space-x-2 md:py-2'>
          <div className={`task-indicator ${displayIndicator()}`} />
          {task.imgUrls.map((url) => (
            <button
              key={url}
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

export default Task;
