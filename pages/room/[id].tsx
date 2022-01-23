import React, { useState, useRef } from 'react';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import {
  BsPlusSquareFill,
  BsCalendarFill,
  BsXSquareFill,
} from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';

import { Layout } from '@/components';
import { db } from '@/config/firebase';
import { useAuth } from '@/context/AuthContext';
import { useCollection, useRoom, useNextQuery } from '@/hooks';
import { Info, InviteUser, RoomNav, Requests, Tasks } from '@/components/Room';

const Room = () => {
  const [description, setDesc] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const router = useRouter();
  const { id } = router.query;
  const tab = useNextQuery('tab');

  const [room, loading] = useRoom(id);

  const [tasks] = useCollection<ITask>(
    query(collection(db, `rooms/${id}/tasks`), orderBy('dateAdded', 'desc')),
    {
      listen: true,
      deps: [room.id],
    }
  );

  const { user, data } = useAuth();
  const dateInputRef = useRef<ReactDatePicker>(null);

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: ITask = {
      description,
      addedBy: data.id!,
      completedBy: [],
      dateAdded: serverTimestamp(),
      dueDate,
    };

    setDesc('');
    const tasksRef = collection(db, `rooms/${room.id}/tasks`);

    if (description && tasks.length < 15) {
      await addDoc(tasksRef, payload);
    }
  };

  const taskDone = async (id: string) => {
    const taskRef = doc(db, `rooms/${room.id}/tasks/${id}`);
    await updateDoc(taskRef, {
      completedBy: arrayUnion(user?.uid),
    });
  };

  if (tab === 'info') return <Info />;
  if (tab === 'invite') return <InviteUser />;
  if (tab === 'requests') return <Requests />;

  return (
    <Layout loaders={[loading]}>
      <RoomNav room={room} />
      <form
        spellCheck='false'
        autoComplete='off'
        onSubmit={addTask}
        className='w-full mt-4'
      >
        <div className='flex-between px-[30px] rounded bg-inputbg text-primary placeholder-inputfg focus-within:border-primary border-2'>
          <input
            maxLength={150}
            minLength={5}
            onChange={(e) => setDesc(e.target.value)}
            value={description}
            type='text'
            placeholder='task description'
            className='bg-inputbg h-[45px] outline-none w-full pr-4'
          />
          <button type='submit'>
            <BsPlusSquareFill className='text-2xl' />
          </button>
        </div>

        <div className='flex dueBtn items-center mt-2'>
          <DatePicker
            placeholderText='No Due Date'
            selected={dueDate}
            onChange={(date: Date) => setDueDate(date)}
            minDate={new Date()}
            ref={dateInputRef}
            className='bg-secondary text-sm w-full outline-none placeholder-primary'
          />

          <div className=' flex text-2xl mr-[3px]'>
            <BsCalendarFill
              className='mr-2'
              onClick={() => dateInputRef.current?.setFocus()}
            />
            <BsXSquareFill onClick={() => setDueDate(null)} />
          </div>
        </div>
      </form>

      <section className='my-4'>
        {tasks?.map((task) => (
          <Tasks
            key={task.id}
            taskDone={taskDone}
            task={task}
            members={room?.members?.length + 1}
          />
        ))}
      </section>
    </Layout>
  );
};

export default Room;
