import React, { useState, useRef } from 'react';

import { BsPlusSquareFill, BsXSquareFill } from 'react-icons/bs';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

import { useRoom } from '@/services';
import { db } from '@/config/firebase';
import { Layout, Error } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { useCollection, useNextQuery } from '@/hooks';
import { Info, InviteUser, RoomMenu, Requests, Task } from '@/components/Room';
import toast from 'react-hot-toast';

const Room = () => {
  const [description, setDesc] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [url, setUrl] = useState('');

  // eslint-disable-next-line prefer-destructuring
  const id = useNextQuery('id');
  const tab = useNextQuery('tab');

  const [room, loading] = useRoom(id);

  const [tasks] = useCollection<ITask>(
    query(collection(db, `rooms/${id}/tasks`), orderBy('dateAdded', 'desc')),
    {
      listen: true,
      deps: [room?.id],
    }
  );

  const { data } = useAuth();
  const dateInputRef = useRef<ReactDatePicker>(null);

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const urlRegExp =
      // eslint-disable-next-line no-useless-escape
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    if (url && !urlRegExp.test(url)) toast.error('Invalid URL');
    else {
      const payload: ITask = {
        description,
        addedBy: data.id!,
        completedBy: [],
        dateAdded: serverTimestamp(),
        dueDate,
        url,
      };

      setDesc('');
      setUrl('');
      setDueDate(null);

      const tasksRef = collection(db, `rooms/${room?.id}/tasks`);

      if (description && tasks.length < 15) {
        toast.promise(addDoc(tasksRef, payload), {
          loading: 'Adding Task...',
          success: 'Task Added',
          error: 'Error Adding Task',
        });
      } else {
        toast.error('Task Limit Reached');
      }
    }
  };

  if (!room || !id) {
    return (
      <Layout>
        <Error code='404' info='room not found' />
      </Layout>
    );
  }

  if (
    data.id &&
    !room.members?.includes(data?.id) &&
    room.creator !== data.id
  ) {
    return (
      <Layout>
        <p className='hidden'>nothing to see here...</p>
      </Layout>
    );
  }

  if (tab === 'info') return <Info />;
  if (tab === 'invite') return <InviteUser />;
  if (tab === 'requests') return <Requests />;

  return (
    <Layout loaders={[loading]}>
      <RoomMenu room={room} />
      <form
        spellCheck='false'
        autoComplete='off'
        onSubmit={addTask}
        className='w-full mt-4'
      >
        <div className='flex-between px-4 rounded bg-inputbg text-primary placeholder-inputfg focus-within:border-primary border-2 group'>
          <input
            required
            maxLength={150}
            minLength={5}
            onChange={(e) => setDesc(e.target.value)}
            value={description}
            type='text'
            placeholder='Task Description'
            className='room-input'
          />
          <button type='submit' className='text-2xl'>
            <BsPlusSquareFill />
          </button>
        </div>

        <div className='flex space-x-2 mt-2'>
          <div className='flex-between group room-input-container'>
            <DatePicker
              placeholderText='Add Due Date'
              selected={dueDate}
              showTimeSelect
              onChange={(date: Date) => setDueDate(date)}
              minDate={new Date()}
              ref={dateInputRef}
              className='room-input'
            />

            <div className='room-input-btn'>
              <BsXSquareFill onClick={() => setDueDate(null)} />
            </div>
          </div>

          <div className='room-input-container'>
            <input
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              type='text'
              placeholder='Add URL'
              className='room-input'
            />
          </div>
        </div>
      </form>
      <section className='mt-4 mb-8 space-y-2'>
        {tasks?.map((task) => (
          <Task key={task.id} room={room} task={task} />
        ))}
      </section>
    </Layout>
  );
};

export default Room;
