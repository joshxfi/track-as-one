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
import { NextPageWithLayout } from 'types/page';
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
import { isNearDeadline, isPastDeadline } from '@/utils/functions';

type SortDate =
  | 'date_added_asc'
  | 'date_added_desc'
  | 'due_date_asc'
  | 'due_date_desc';

type FilterStatus = 'All' | 'Completed' | 'Almost Due' | 'Past Due';

const Room: NextPageWithLayout = () => {
  const { props, reset } = useTaskFields();
  const { description, url, dueDate, images } = props;

  const [addTaskModal, setAddTaskModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sortBy, setSortBy] = useState<SortDate>('date_added_desc');
  const [filterBy, setFilterBy] = useState<FilterStatus>('All');

  const { data } = useAuth();
  const { userTag } = data;
  const { room, tasks, tasksLoading } = useRoomContext();

  const sortedTasks = useMemo(() => {
    return tasks
      ?.filter((task) => {
        const completedByUser = task.completedBy.includes(userTag);
        if (filterBy === 'Completed') return task.completedBy.includes(userTag);
        if (filterBy === 'Almost Due')
          return isNearDeadline(task.dueDate) && !completedByUser;
        if (filterBy === 'Past Due')
          return isPastDeadline(task.dueDate) && !completedByUser;

        return true;
      })
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
  }, [tasks, sortBy, filterBy]);

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
      else if (tasks && tasks.length >= 100)
        toast.error('Task limit reached (100)');
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

  const SortDate = ({ label, value }: { label: string; value: SortDate }) =>
    useMemo(() => {
      const id = nanoid();

      return (
        <label
          htmlFor={id}
          className='flex cursor-pointer items-center space-x-2'
        >
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

  const SortStatus = ({ label }: { label: FilterStatus }) =>
    useMemo(() => {
      const id = nanoid();

      return (
        <label
          htmlFor={id}
          className='flex cursor-pointer items-center space-x-2'
        >
          <input
            type='radio'
            name='sort_status'
            id={id}
            value={label}
            checked={filterBy === label}
            onChange={() => setFilterBy(label)}
          />
          <p>{label}</p>
        </label>
      );
    }, [filterBy]);

  const resetFilter = () => {
    setSortBy('date_added_desc');
    setFilterBy('All');
  };

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
        isOpen={addTaskModal}
        setIsOpen={setAddTaskModal}
        proceed={{ action: addTask, text: 'Add Task' }}
      />

      <Modal
        isOpen={filterModal}
        setIsOpen={setFilterModal}
        title='Sort Tasks'
        proceed={{ action: resetFilter, text: 'Reset', style: 'bg-blue-500' }}
        body={
          <div>
            <hr className='my-4' />

            <div className='space-y-8'>
              <div>
                <h2 className='font-medium'>Date Added</h2>
                <div className='radio-sort'>
                  <SortDate label='Ascending' value='date_added_asc' />
                  <SortDate label='Descending' value='date_added_desc' />
                </div>
              </div>

              <div>
                <h2 className='font-medium'>Due Date</h2>
                <p className='text-xs text-gray-700'>
                  No specified due dates will be hidden.
                </p>
                <div className='radio-sort'>
                  <SortDate label='Ascending' value='due_date_asc' />
                  <SortDate label='Descending' value='due_date_desc' />
                </div>
              </div>

              <div>
                <h2 className='font-medium'>Status</h2>
                <div className='mt-2 grid grid-cols-2 gap-y-2'>
                  <SortStatus label='All' />
                  <SortStatus label='Completed' />
                  <SortStatus label='Almost Due' />
                  <SortStatus label='Past Due' />
                </div>
              </div>
            </div>
            <hr className='my-4' />
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
          <Error
            code=''
            info={
              filterBy !== 'All'
                ? `there are no ${filterBy.toLowerCase()} task(s)`
                : 'get started by clicking the plus icon'
            }
          />
        )
      )}
    </>
  );
};

Room.getLayout = (page: React.ReactElement) => (
  <RoomProvider>{page}</RoomProvider>
);

export default Room;
