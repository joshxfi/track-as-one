import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { BsCheckCircleFill } from 'react-icons/bs';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { Error } from '@/components';
import { db } from '@/config/firebase';
import { urlRegExp } from '@/utils/constants';
import { useAuth } from '@/contexts/AuthContext';
import { NextPageWithLayout } from '@/types/page';
import { useNextQuery, useTaskFields, useUpload } from '@/hooks';
import { RoomProvider, useRoomContext } from '@/contexts/RoomContext';
import {
  Info,
  InviteUser,
  RoomMenu,
  Requests,
  Task,
  TaskFields,
  TaskLoader,
} from '@/components/Room';
import { AiOutlinePlus } from 'react-icons/ai';

const Room: NextPageWithLayout = () => {
  const { props, reset } = useTaskFields();
  const { description, url, dueDate, images } = props;

  const [addTaskModal, setAddTaskModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data } = useAuth();
  const { userTag } = data;
  const { room, tasks } = useRoomContext();

  // eslint-disable-next-line prefer-destructuring
  const tab = useNextQuery('tab');
  const [upload, uploading, error] = useUpload();

  const completedByAll = useCallback(
    (task: ITask) =>
      task.completedBy.length === room.members.length + room.admin.length + 1,
    [room]
  );

  const addTask = async () => {
    if (url && !urlRegExp.test(url)) toast.error('Invalid URL');
    else if (tasks && tasks.length >= 20)
      toast.error('Task limit reached (20)');
    else if (!description) toast.error('Task description is required');
    else {
      setAddTaskModal(false);
      setLoading(true);
      reset();

      let payload: ITask = {
        description,
        addedBy: userTag,
        completedBy: [],
        dateAdded: serverTimestamp(),
        dateEdited: null,
        editedBy: '',
        dueDate,
        url,
      };

      if (images.length > 0) {
        const imgUrls = await upload(`rooms/${room.id}/images`, images);
        payload = {
          ...payload,
          imgUrls,
        };

        if (error) toast.error('An error occurred while uploading images');
      }

      const tasksRef = collection(db, `rooms/${room.id}/tasks`);
      await addDoc(tasksRef, payload);
      toast.success('Task Added');
      setTimeout(() => setLoading(false), 300);
    }
  };

  if (!room || !room.id) {
    return <Error info='room not found' />;
  }

  if (
    userTag &&
    !room.members?.includes(userTag) &&
    room.creator !== userTag &&
    !room.admin?.includes(userTag)
  ) {
    return <div />;
  }

  if (tab === 'info') return <Info />;
  if (tab === 'invite') return <InviteUser />;
  if (tab === 'requests') return <Requests />;

  return (
    <>
      {loading && (
        <TaskLoader msg={uploading ? 'Uploading Image(s)' : 'Adding Task'} />
      )}
      <div className='my-4 flex items-center justify-between font-medium'>
        <h2 className='text-sm'>{room.name}</h2>
        <div className='flex space-x-2'>
          <button
            type='button'
            onClick={() => setAddTaskModal(true)}
            className='room-btn'
          >
            <AiOutlinePlus />
          </button>
          <RoomMenu />
        </div>
      </div>

      <TaskFields
        {...props}
        proceed={addTask}
        title='Add Task'
        proceedText='Add'
        isOpen={addTaskModal}
        setIsOpen={setAddTaskModal}
      />

      {tasks && tasks?.length > 0 ? (
        <section className='mb-8 space-y-2'>
          {tasks
            .filter((task) => !completedByAll(task))
            .map((task) => (
              <Task key={task.id} task={task} />
            ))}

          {tasks.filter(completedByAll).length > 0 && (
            <div className='flex items-center space-x-2 py-2'>
              <BsCheckCircleFill className='flex-none' />
              <div className='h-[1px] w-full bg-primary' />
            </div>
          )}

          {tasks.filter(completedByAll).map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </section>
      ) : (
        <Error code='' info='get started by clicking the plus icon' />
      )}
    </>
  );
};

Room.getLayout = (page: React.ReactElement) => (
  <RoomProvider>{page}</RoomProvider>
);

export default Room;
