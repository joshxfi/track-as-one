import React, { useState, useMemo, useCallback } from 'react';
import { nanoid } from 'nanoid';
import Tippy from '@tippyjs/react';
import toast from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { BsCheckCircleFill, BsInfoCircleFill, BsFilter } from 'react-icons/bs';

import { db } from '@/config/firebase';
import { Error, Modal } from '@/components';
import { Button } from '@/components/Button';
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

// eslint-disable-next-line import/no-extraneous-dependencies
import 'tippy.js/dist/tippy.css';

type SortDate =
  | 'date_added_asc'
  | 'date_added_desc'
  | 'due_date_asc'
  | 'due_date_desc';

const Room: NextPageWithLayout = () => {
  const { props, reset } = useTaskFields();
  const { description, url, dueDate, images } = props;

  const [addTaskModal, setAddTaskModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sortBy, setSortBy] = useState<SortDate>('date_added_desc');

  const { data } = useAuth();
  const { userTag } = data;
  const { room, tasks, tasksLoading } = useRoomContext();

  const sortedTasks = useMemo(() => {
    return tasks
      ?.filter((task) => (sortBy?.includes('due') ? task.dueDate : task))
      .sort((a, b) => {
        if (sortBy && sortBy !== 'date_added_desc') {
          if (sortBy.includes('added')) {
            if (sortBy.includes('asc')) return a.dateAdded - b.dateAdded;
          }

          if (sortBy.includes('asc')) return a.dueDate - b.dueDate;
          return b.dueDate - a.dueDate;
        }

        return 0;
      });
  }, [tasks, sortBy]);

  // eslint-disable-next-line prefer-destructuring
  const tab = useNextQuery('tab');
  const [upload, uploading, error] = useUpload();

  const completedByAll = useCallback(
    (task: ITask) =>
      task.completedBy.length === room.members.length + room.admin.length + 1,
    [room]
  );

  const addTask = async () => {
    try {
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
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const RadioSort = ({ label, value }: { label: string; value: SortDate }) =>
    useMemo(() => {
      const id = nanoid();

      return (
        <label htmlFor={id} className='flex cursor-pointer space-x-2'>
          <input
            type='radio'
            name='sort_date'
            id={id}
            value={value}
            checked={sortBy === value}
            onChange={() => setSortBy(value)}
          />
          <p>{label}</p>
        </label>
      );
    }, [sortBy]);

  if (!room.creator) return <Error info='room not found' />;
  if (
    userTag &&
    !room.members?.includes(userTag) &&
    room.creator !== userTag &&
    !room.admin?.includes(userTag)
  ) {
    return <Error code='403' info='you are not a member' />;
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
        <div className='flex items-center space-x-2'>
          <h2 className='text-sm'>{room.name}</h2>
          <Tippy
            placement='bottom'
            content={
              <div className='space-y-2 p-2 font-normal'>
                <p>Task Indicator:</p>
                <ul className='space-y-1'>
                  <li className='border-l-4 border-gray-400 pl-2'>To do</li>
                  <li className='border-l-4 border-green-500 pl-2'>
                    Completed
                  </li>
                  <li className='border-l-4 border-secondary pl-2'>
                    Almost due
                  </li>
                  <li className='border-l-4 border-red-500 pl-2'>Past due</li>
                </ul>
              </div>
            }
          >
            <div>
              <BsInfoCircleFill />
            </div>
          </Tippy>
        </div>
        <div className='flex space-x-2'>
          <Button
            type='button'
            Icon={AiOutlinePlus}
            onClick={() => setAddTaskModal(true)}
            className='room-btn'
          />
          <Button
            type='button'
            Icon={BsFilter}
            onClick={() => setFilterModal(true)}
            className='room-btn'
          />
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

      <Modal
        isOpen={filterModal}
        setIsOpen={setFilterModal}
        title='Sort Tasks'
        body={
          <div>
            <hr className='my-4' />

            <div className='space-y-8'>
              <div>
                <h2 className='font-medium'>Date Added</h2>
                <div className='sort-container'>
                  <RadioSort label='Ascending' value='date_added_asc' />
                  <RadioSort label='Descending' value='date_added_desc' />
                </div>
              </div>

              <div>
                <h2 className='font-medium'>Due Date</h2>
                <div className='sort-container'>
                  <RadioSort label='Ascending' value='due_date_asc' />
                  <RadioSort label='Descending' value='due_date_desc' />
                </div>
              </div>
            </div>
          </div>
        }
      />

      {sortedTasks && sortedTasks?.length > 0 ? (
        <section className='mb-8 space-y-2'>
          {sortedTasks
            .filter((task) => !completedByAll(task))
            .map((task) => (
              <Task key={task.id} task={task} />
            ))}

          {sortedTasks.filter(completedByAll).length > 0 && (
            <div className='flex items-center space-x-2 py-2'>
              <BsCheckCircleFill className='flex-none' />
              <div className='h-[1px] w-full bg-primary' />
            </div>
          )}

          {sortedTasks.filter(completedByAll).map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </section>
      ) : (
        !tasksLoading && (
          <Error code='' info='get started by clicking the plus icon' />
        )
      )}
    </>
  );
};

Room.getLayout = (page: React.ReactElement) => (
  <RoomProvider>{page}</RoomProvider>
);

export default Room;
