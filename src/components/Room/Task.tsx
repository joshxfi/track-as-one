import React, { useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import Tippy from '@tippyjs/react';
import toast from 'react-hot-toast';
import {
  MdMoreVert,
  MdCheck,
  MdLink,
  MdEdit,
  MdDelete,
  MdUndo,
} from 'react-icons/md';

import {
  doc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from 'firebase/firestore';
import {
  dateWithTime,
  isNearDeadline,
  isPastDeadline,
  timeoutModal,
} from '@/utils/functions';
import { IconType } from 'react-icons';
import { IoMdEye } from 'react-icons/io';
import { useUserByTag } from '@/services';
import { db, storage } from '@/config/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { useTaskFields, useUpload } from '@/hooks';
import { deleteObject, ref } from 'firebase/storage';
import { useRoomContext } from '@/contexts/RoomContext';
import { defaultPic, urlRegExp } from '@/utils/constants';
import { Modal, EmptyModal, ImageFill } from '@/components';
import { CompletedUser, TaskFields, TaskLoader } from '@/components/Room';

interface ButtonProps {
  onClick: () => void;
  className: string;
  tooltip: string;
  Icon: IconType;
}

const Task = ({ task }: { task: ITask }) => {
  const [delModal, setDelModal] = useState(false);
  const [urlModal, setUrlModal] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);
  const [completedByModal, setCompletedByModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [displayImage, setDisplayImage] = useState('');
  const [displayImageModal, setDisplayImageModal] = useState(false);

  const { props, reset } = useTaskFields(task);
  const [upload, uploading, error] = useUpload();
  const { description, url, dueDate, images } = props;

  const {
    data: { userTag },
  } = useAuth();
  const { room } = useRoomContext();

  const taskRef = doc(db, `rooms/${room?.id}/tasks/${task.id}`);
  const completedByUser = task.completedBy.includes(userTag ?? '');

  const editedBy = useMemo(() => task.editedBy ?? 'default', [task]);

  const [taskCreator] = useUserByTag(task.addedBy);
  const [taskEditor] = useUserByTag(editedBy);

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
    try {
      if (url && !urlRegExp.test(url)) toast.error('Invalid URL');
      else if (!description) toast.error('Task description is required');
      else {
        setEditModal(false);
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

          if (task.imgUrls && task.imgUrls?.length > 0) {
            task.imgUrls.forEach(async (url) => {
              try {
                await deleteObject(ref(storage, url));
              } catch (e: any) {
                toast.error(e.message);
              }
            });
          }

          if (error) toast.error('An error occurred while uploading images');
        }

        await updateDoc(taskRef, payload);
        toast.success('Task Edited');
        setTimeout(() => setLoading(false), 300);
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const taskDone = async () => {
    try {
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
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const taskDel = () => {
    setDelModal(false);
    setTimeout(async () => {
      try {
        await deleteDoc(taskRef);
        toast.success('Task Deleted');

        if (task.imgUrls && task.imgUrls?.length > 0) {
          task.imgUrls.forEach(async (url) => {
            await deleteObject(ref(storage, url));
          });
        }
      } catch (e: any) {
        toast.error(e.message);
      }
    }, 300);
  };

  const taskInfo = useMemo(
    () => [
      {
        title: 'Date Added',
        info: task.dateAdded?.toDate().toDateString(),
      },
      {
        title: 'Added By',
        info: taskCreator?.username,
      },
      {
        title: 'Recent Edit',
        info: task.dateEdited?.toDate().toDateString(),
      },
      {
        title: 'Recent Edit By',
        info: taskEditor?.username,
      },
    ],
    [task, taskCreator?.username, taskEditor?.username]
  );

  const nearDeadline = useMemo(
    () => isNearDeadline(task.dueDate),
    [task.dueDate]
  );
  const pastDeadline = useMemo(
    () => isPastDeadline(task.dueDate),
    [task.dueDate]
  );

  const displayIndicator = useMemo(() => {
    if (userTag && task.completedBy.includes(userTag)) return 'bg-green-500';
    if (pastDeadline) return 'bg-red-500';
    if (nearDeadline) return 'bg-secondary';
    return 'bg-gray-400';
  }, [userTag, task.completedBy, pastDeadline, nearDeadline]);

  const Button = ({ tooltip, onClick, className, Icon }: ButtonProps) =>
    useMemo(() => {
      return (
        <Tippy content={tooltip}>
          <button
            onClick={onClick}
            type='button'
            className={`task-option-btn text-white ${className}`}
          >
            <Icon />
          </button>
        </Tippy>
      );
    }, []);

  return (
    <div className='flex flex-col'>
      {loading && (
        <TaskLoader msg={uploading ? 'Uploading Image(s)' : 'Adding Task'} />
      )}

      <div
        className={`relative min-h-[70px] w-full bg-primary p-4 px-6 text-secondary md:px-7 ${
          hasImg ? 'rounded-t' : 'rounded'
        } group cursor-default overflow-hidden transition-all duration-300 hover:pr-12`}
      >
        <div className={`task-indicator ${displayIndicator}`} />

        <TaskFields
          {...props}
          isOpen={editModal}
          setIsOpen={setEditModal}
          onDismiss={reset}
          proceed={{ action: editTask, text: 'Edit Task' }}
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
              <p className='break-all text-blue-500 underline'>{task.url}</p>
            </div>
          }
          proceed={{ href: task.url }}
          setIsOpen={setUrlModal}
          isOpen={urlModal}
        />

        <Modal
          title='Completed By'
          body={
            <>
              <hr className='my-4' />
              <div className='max-h-[425px] overflow-x-hidden overflow-y-scroll'>
                {task.completedBy.map((tag) => (
                  <CompletedUser userTag={tag} />
                ))}
              </div>
            </>
          }
          setIsOpen={setCompletedByModal}
          isOpen={completedByModal}
        />

        <Modal
          title='Task Info'
          isOpen={optionsModal}
          setIsOpen={setOptionsModal}
          body={
            <div className='mt-2 space-y-2 pb-4 text-sm text-gray-800 md:text-base'>
              <hr className='my-4' />

              {taskInfo.map(
                (val, i) =>
                  val.info && (
                    <div>
                      {i === 2 && <hr className='my-5' />}
                      <div
                        key={nanoid()}
                        className='flex justify-between space-x-4 text-right'
                      >
                        <p>{val.title}: </p>
                        <p>{val.info}</p>
                      </div>
                    </div>
                  )
              )}
            </div>
          }
          buttons={
            <>
              {canModify && (
                <>
                  <Button
                    tooltip='Delete Task'
                    className='bg-red-600'
                    Icon={MdDelete}
                    onClick={() => {
                      setOptionsModal(false);

                      setTimeout(() => {
                        setDelModal(true);
                      }, 500);
                    }}
                  />

                  <Button
                    tooltip='Edit Task'
                    className='bg-blue-600'
                    Icon={MdEdit}
                    onClick={() => {
                      setOptionsModal(false);

                      setTimeout(() => {
                        setEditModal(true);
                      }, 500);
                    }}
                  />
                </>
              )}
              {task.url && (
                <Button
                  tooltip='Visit URL'
                  className='bg-amber-500'
                  Icon={MdLink}
                  onClick={() => timeoutModal(setOptionsModal, setUrlModal)}
                />
              )}
              {task.completedBy.length > 0 && (
                <Button
                  tooltip='Completed By'
                  className='bg-violet-600'
                  Icon={IoMdEye}
                  onClick={() => {
                    setOptionsModal(false);

                    setTimeout(() => {
                      setCompletedByModal(true);
                    }, 500);
                  }}
                />
              )}
              <Button
                tooltip={completedByUser ? 'Undo Task' : 'Complete Task'}
                className='bg-green-600'
                Icon={completedByUser ? MdUndo : MdCheck}
                onClick={taskDone}
              />
            </>
          }
        />

        <button
          onClick={() => setOptionsModal(true)}
          className='absolute top-0 -right-14 flex h-full w-8 items-center justify-center bg-secondary text-2xl text-white transition-all duration-300 group-hover:right-0'
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
                : 'No Due Date Specified'}
            </p>
            <p>
              Done: {task.completedBy?.length}/
              {room.members.length + 1 + room.admin.length}
            </p>
          </div>
        </div>
      </div>

      <Modal
        title='View Image'
        isOpen={imgModal}
        setIsOpen={setImgModal}
        proceed={{ href: displayImage }}
        description='Do you want to open the image in a new tab?'
      />

      <EmptyModal
        isOpen={displayImageModal}
        setIsOpen={setDisplayImageModal}
        body={
          <button
            type='button'
            onClick={() => timeoutModal(setDisplayImageModal, setImgModal)}
            className='grid w-screen max-w-screen-md place-items-center md:mr-4'
          >
            <img
              src={displayImage ?? defaultPic}
              className='w-[90%] rounded object-contain md:w-full'
              alt='task info'
            />
          </button>
        }
      />

      {task.imgUrls && task.imgUrls?.length > 0 && (
        <div className='relative flex space-x-1 overflow-hidden rounded-b bg-primary bg-opacity-90 py-1 px-4 sm:space-x-2 md:py-2'>
          <div className={`task-indicator ${displayIndicator}`} />
          {task.imgUrls.map((url) => (
            <button
              key={url}
              type='button'
              onClick={() => {
                setDisplayImage(url);
                setDisplayImageModal(true);
              }}
            >
              <ImageFill
                priority
                src={url ?? defaultPic}
                className='h-14 w-14 rounded sm:h-20 sm:w-20'
                alt='task thumbnail'
                quality={1}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Task;
