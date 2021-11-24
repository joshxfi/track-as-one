import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import {
  BsPlusSquareFill,
  BsCalendarFill,
  BsXSquareFill,
} from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import useRoom from '@/hooks/useRoom';
import { db } from '@/config/firebase';
import { useCollection } from '@/hooks';
import { useAuth } from '@/context/AuthContext';
import { Container, Header } from '@/components';
import { RoomInfo, RoomInvite, RoomNav, RoomRequest, RoomTask } from '@/components/Room';

const Room = () => {
  const [description, setDesc] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date | null>(new Date());

  const router = useRouter();
  const { id, tab } = router.query;

  const [tasks] = useCollection<ITask>(collection(db, `rooms/${id}/tasks`), {
    listen: true,
  });

  const [room] = useRoom(id);

  const { id: roomID } = room;
  const { data } = useAuth();
  const { userTag } = data;

  const dateInputRef = useRef<ReactDatePicker>(null);
  const memberCount = room?.members?.length + 1;

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: ITask = {
      description,
      addedBy: userTag,
      completedBy: [],
      dateAdded: serverTimestamp(),
      dueDate,
    };

    setDesc('');
    const tasksRef = collection(db, `rooms/${roomID}/tasks`);

    if (description && tasks.length < 15) {
      await addDoc(tasksRef, payload);
    }
  };

  if (tab === 'info') return <RoomInfo />;
  if (tab === 'invite') return <RoomInvite />;
  if (tab === 'requests') return <RoomRequest />;

  return (
    <Container>
      <RoomNav room={room} />
      <Header title={room?.name} desc='' />
      <form
        spellCheck='false'
        autoComplete='off'
        onSubmit={addTask}
        className='w-full'
      >
        <div className='flex-between px-[30px] rounded-lg bg-inputbg text-primary placeholder-inputfg focus-within:border-primary border-2'>
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
            className='bg-secondary text-sm w-full outline-none font-semibold placeholder-primary'
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
      <div className='w-full my-2'>
        <AnimatePresence>
          {tasks?.map((task) => (
            <RoomTask key={task.id} task={task} memberCount={memberCount} />
          ))}
        </AnimatePresence>
      </div>
    </Container>
  );
};

export default Room;
