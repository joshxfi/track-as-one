import React, { useState } from 'react';

import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { BiDoorOpen } from 'react-icons/bi';
import {
  updateDoc,
  doc,
  setDoc,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';

import { useDocument } from '@/hooks';
import { db } from '@/config/firebase';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { Header, Input, Layout } from '@/components';

const Create = () => {
  const [roomName, setRoomName] = useState<string>('');

  const { push } = useRouter();
  const {
    data: { id },
  } = useAuth();

  const [user] = useDocument<IUser>(doc(db, `users/${id}`), { deps: [id] });

  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomID = nanoid(5);

    const payload: IRoom = {
      name: roomName,
      creator: id!,
      admin: [],
      members: [],
      dateAdded: serverTimestamp(),
      requests: [],
    };

    setRoomName('');
    if (user.roomsCreated.length >= 3) {
      toast.error('max rooms reached (3)');
    } else if (roomName) {
      toast.promise(setDoc(doc(db, 'rooms', roomID), payload), {
        loading: 'creating room...',
        success: 'room created!',
        error: 'room could not be created.',
      });

      push(`/home`);

      await updateDoc(doc(db, 'users', id!), {
        roomsCreated: arrayUnion(roomID),
      });
    }
  };

  return (
    <Layout>
      <Header title='Create a Room' />
      <form
        onSubmit={createRoom}
        className='w-full flex justify-center flex-col items-center'
      >
        <Input
          handleChange={(e) => setRoomName(e.target.value)}
          value={roomName}
          placeholder='enter room name'
          max={15}
        />

        <div className='inline-block mx-auto mt-2'>
          <Button
            name='create room'
            type='submit'
            className='btn btn-effect'
            iconStyles='text-secondary text-xl'
            Icon={BiDoorOpen}
          />
        </div>
      </form>
    </Layout>
  );
};

export default Create;
