import React, { useState, useRef } from 'react';

import { BsPlusSquareFill, BsXSquareFill } from 'react-icons/bs';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

import { db } from '@/config/firebase';
import { Layout, Error } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { useCollection, useRoom, useNextQuery } from '@/hooks';
import {
  Info,
  InviteUser,
  RoomSettings,
  Requests,
  Task,
} from '@/components/Room';
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
        loading: 'adding task...',
        success: 'task added',
        error: 'error adding task',
      });
    }
  };

  const taskDone = async (id: string) => {
    const taskRef = doc(db, `rooms/${room?.id}/tasks/${id}`);
    await updateDoc(taskRef, {
      completedBy: arrayUnion(data.id),
    });

    toast.success('task completed!');
  };

  const taskDel = async (id: string) => {
    toast.promise(deleteDoc(doc(db, `rooms/${room?.id}/tasks/${id}`)), {
      loading: 'deleting task...',
      success: 'task deleted',
      error: 'error deleting task',
    });
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
        <Error code='401' info='you have no access' />
      </Layout>
    );
  }

  if (tab === 'info') return <Info />;
  if (tab === 'invite') return <InviteUser />;
  if (tab === 'requests') return <Requests />;

  return (
    <Layout loaders={[loading]}>
      <RoomSettings room={room} />
      <form
        spellCheck='false'
        autoComplete='off'
        onSubmit={addTask}
        className='w-full mt-4'
      >
        <div className='flex-between px-4 rounded bg-inputbg text-primary placeholder-inputfg focus-within:border-primary border-2 group'>
          <input
            maxLength={150}
            minLength={5}
            onChange={(e) => setDesc(e.target.value)}
            value={description}
            type='text'
            placeholder='task description'
            className='bg-inputbg h-[45px] outline-none w-full pr-4 text-sm md:text-base'
          />
          <button
            type='submit'
            className='group-hover:opacity-100 text-2xl opacity-0 transition-opacity'
          >
            <BsPlusSquareFill />
          </button>
        </div>

        <div className='flex space-x-2 mt-2'>
          <div className='flex-between px-4 rounded bg-inputbg text-primary placeholder-inputfg focus-within:border-primary border-2 group w-full'>
            <DatePicker
              placeholderText='add due date'
              selected={dueDate}
              onChange={(date: Date) => setDueDate(date)}
              minDate={new Date()}
              ref={dateInputRef}
              className='bg-inputbg h-[45px] outline-none w-full pr-4 text-sm md:text-base'
            />

            <div className='group-hover:opacity-100 text-2xl opacity-0 transition-opacity'>
              <BsXSquareFill onClick={() => setDueDate(null)} />
            </div>
          </div>

          <div className='px-4 rounded bg-inputbg text-primary placeholder-inputfg focus-within:border-primary border-2 w-full'>
            <input
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              type='text'
              placeholder='add url'
              className='bg-inputbg h-[45px] outline-none w-full pr-4 text-sm md:text-base'
            />
          </div>
        </div>
      </form>
      <section className='mt-4 mb-8 space-y-2'>
        {tasks?.map((task) => (
          <Task
            isAdmin={room.creator === data.id}
            key={task.id}
            taskDone={taskDone}
            taskDel={taskDel}
            task={task}
            members={room?.members?.length + 1}
          />
        ))}
      </section>
    </Layout>
  );
};

export default Room;
