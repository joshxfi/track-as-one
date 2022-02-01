import React, { useState } from 'react';

import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { BiDoorOpen } from 'react-icons/bi';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useCreatedRooms } from '@/services';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { Header, Input, Layout } from '@/components';

const Create = () => {
  const [roomName, setRoomName] = useState<string>('');

  const { push } = useRouter();
  const {
    data: { id },
  } = useAuth();

  const [roomsCreated] = useCreatedRooms(id);

  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomId = nanoid(5);

    const payload: IRoom = {
      name: roomName,
      creator: id!,
      admin: [],
      members: [],
      dateAdded: serverTimestamp(),
      requests: [],
    };

    setRoomName('');
    if (roomsCreated.length >= 3) {
      toast.error('max rooms reached (3)');
    } else if (roomName) {
      toast.promise(setDoc(doc(db, 'rooms', roomId), payload), {
        loading: 'Creating Room...',
        success: 'Room Created!',
        error: 'Room Could not be Created.',
      });

      push(`/home`);
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
          onChange={(e) => setRoomName(e.target.value)}
          value={roomName}
          placeholder='enter room name'
          minLength={5}
          maxLength={15}
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
