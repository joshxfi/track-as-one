import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { BiDoorOpen } from 'react-icons/bi';
import {
  updateDoc,
  doc,
  setDoc,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';

import { db } from '@/config/firebase';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { Header, ErrorMsg, Input, Layout } from '@/components';

const Create = () => {
  const [error, setError] = useState<string>('blank');
  const [roomName, setRoomName] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  const router = useRouter();

  const {
    data: { id, roomsCreated },
  } = useAuth();

  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomID = `room:${nanoid(5)}`;

    const payload: IRoom = {
      name: roomName,
      creator: id!,
      admin: [],
      members: [],
      dateAdded: serverTimestamp(),
      requests: [],
    };

    setRoomName('');
    if (roomsCreated!.length >= 3) {
      setError('Max rooms reached (3)');
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 3000);
    } else if (roomName) {
      await setDoc(doc(db, 'rooms', roomID), payload);

      router.push(`/home`);

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
        <ErrorMsg error={error} showError={showError} />

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
