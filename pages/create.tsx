import React, { ReactElement, useState } from 'react';

import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { BiDoorOpen } from 'react-icons/bi';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useCreatedRooms } from '@/services';
import { useAuth } from '@/context/AuthContext';
import { Layout, RoomInput } from '@/components';
import { NextPageWithLayout } from '@/types/page';

const Create: NextPageWithLayout = () => {
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
    if (roomsCreated && roomsCreated.length >= 3) {
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
    <RoomInput
      title='Create a Room'
      btnLabel='create room'
      Icon={BiDoorOpen}
      onSubmit={createRoom}
      onChange={(e) => setRoomName(e.target.value)}
      value={roomName}
      placeholder='enter room name'
    />
  );
};

Create.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Create;
