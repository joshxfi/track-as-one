import React, {
  useState,
  useRef,
  ChangeEventHandler,
  useCallback,
} from 'react';

import {
  BsCheckCircleFill,
  BsPlusSquareFill,
  BsXSquareFill,
} from 'react-icons/bs';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

import { useRoom } from '@/services';
import { db } from '@/config/firebase';
import { urlRegExp } from '@/utils/constants';
import { useAuth } from '@/context/AuthContext';
import { NextPageWithLayout } from '@/types/page';
import { Layout, Error, Modal } from '@/components';
import { useCol, useNextQuery, useUpload } from '@/hooks';
import { Info, InviteUser, RoomMenu, Requests, Task } from '@/components/Room';

const Room: NextPageWithLayout = () => {
  const [description, setDesc] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [url, setUrl] = useState('');
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data } = useAuth();
  const { userTag } = data;

  // eslint-disable-next-line prefer-destructuring
  const id = useNextQuery('id');
  const tab = useNextQuery('tab');

  const [room] = useRoom(id);
  const upload = useUpload();

  const [tasks] = useCol<ITask>(
    query(collection(db, `rooms/${id}/tasks`), orderBy('dateAdded', 'desc'))
  );

  const dateInputRef = useRef<ReactDatePicker>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const completedByAll = useCallback(
    (task: ITask) => task.completedBy.length === room.members.length + 1,
    [room]
  );

  const imgHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { files } = e.target;

      if (files) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > 3 * 1024 * 1024) {
            toast.error('max image size is 3MB');
            return;
          }
        }

        if (files.length > 3) toast.error('you can only upload up to 3 images');
        else setImages(Array.from(files));
      }
    },
    [setImages]
  );

  const addTask = async () => {
    if (url && !urlRegExp.test(url)) toast.error('Invalid URL');
    else if (tasks && tasks.length >= 15) toast.error('Task Limit Reached');
    else {
      setLoading(true);

      setDesc('');
      setUrl('');
      setImages([]);
      setDueDate(null);

      const imgUrls = await upload(`rooms/${id}/images`, images);

      const payload: ITask = {
        description,
        addedBy: userTag,
        completedBy: [],
        dateAdded: serverTimestamp(),
        imgUrls,
        dueDate,
        url,
      };

      const tasksRef = collection(db, `rooms/${room?.id}/tasks`);

      await addDoc(tasksRef, payload);
      toast.success('Task Added');

      setModal(false);
      setTimeout(() => setLoading(false), 300);
    }
  };

  if (!room || !id) {
    return <Error code='404' info='room not found' />;
  }

  if (
    userTag &&
    !room.members?.includes(userTag) &&
    room.creator !== userTag &&
    !room.admin?.includes(userTag)
  ) {
    return <></>;
  }

  if (tab === 'info') return <Info />;
  if (tab === 'invite') return <InviteUser />;
  if (tab === 'requests') return <Requests />;

  return (
    <>
      <RoomMenu room={room} />
      <input
        ref={fileRef}
        multiple
        accept='image/png,image/gif,image/jpeg'
        className='hidden'
        type='file'
        onChange={imgHandler}
      />

      <form
        spellCheck='false'
        autoComplete='off'
        onSubmit={(e) => {
          e.preventDefault();
          setModal(true);
        }}
        className='mt-4 w-full'
      >
        <div className='flex-between group rounded border-2 border-gray-300 bg-inputbg px-4 text-primary placeholder-inputfg focus-within:border-primary'>
          <input
            required
            maxLength={300}
            minLength={5}
            onChange={(e) => setDesc(e.target.value)}
            value={description}
            type='text'
            placeholder='Task Description'
            className='h-[45px] w-full bg-inputbg text-sm outline-none md:text-base'
          />
          <button type='submit' className='text-2xl'>
            <BsPlusSquareFill />
          </button>
        </div>

        <Modal
          isOpen={modal}
          setIsOpen={setModal}
          title='Add Task'
          proceed={addTask}
          isLoading={loading}
          body={
            <div className='mt-4 flex flex-col space-y-4'>
              <div className='flex-between room-input-container group'>
                <DatePicker
                  placeholderText='Add Due Date (optional)'
                  selected={dueDate}
                  showTimeSelect
                  onChange={(date: Date) => setDueDate(date)}
                  minDate={new Date()}
                  ref={dateInputRef}
                  className='room-input pr-2'
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
                  placeholder='Add URL (optional)'
                  className='room-input'
                />
              </div>

              <button
                onClick={() => fileRef.current?.click()}
                type='button'
                className='room-input-container flex'
              >
                <p className='flex h-[45px] items-center text-left text-sm text-[#9CA3AF] md:text-base'>
                  Add Image {images.length}/3 (optional)
                </p>
              </button>
            </div>
          }
        />
      </form>
      {tasks && (
        <section className='mt-4 mb-8 space-y-2'>
          {tasks
            .filter((task) => !completedByAll(task))
            .map((task) => (
              <Task key={task.id} room={room} task={task} />
            ))}

          {tasks.filter(completedByAll).length > 0 && (
            <div className='flex items-center space-x-2 py-2'>
              <BsCheckCircleFill className='flex-none' />
              <div className='h-[1px] w-full bg-primary' />
            </div>
          )}

          {tasks.filter(completedByAll).map((task) => (
            <Task key={task.id} room={room} task={task} />
          ))}
        </section>
      )}
    </>
  );
};

Room.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Room;
