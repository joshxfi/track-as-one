import React, { ReactElement, useState } from 'react';

import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { BiDoorOpen } from 'react-icons/bi';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useCreatedRooms } from '@/services';
import { useAuth } from '@/contexts/AuthContext';
import { Layout, RoomInput } from '@/components';
import { NextPageWithLayout } from '@/types/page';

const Create: NextPageWithLayout = () => {
  const [roomName, setRoomName] = useState<string>('');

  const { push } = useRouter();
  const {
    data: { userTag },
  } = useAuth();

  const [roomsCreated] = useCreatedRooms(userTag);

  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const roomId = nanoid(5);

      const payload: IRoom = {
        name: roomName,
        creator: userTag,
        admin: [],
        members: [],
        dateAdded: serverTimestamp(),
        requests: [],
      };

      setRoomName('');
      if (roomsCreated && roomsCreated.length >= 5) {
        toast.error('max rooms reached (5)');
      } else if (roomName) {
        await setDoc(doc(db, 'rooms', roomId), payload);
        toast.success('Room Created!');
        push(`/home`);
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <RoomInput
      btnLabel='create room'
      Icon={BiDoorOpen}
      onSubmit={createRoom}
      onChange={(e) => setRoomName(e.target.value)}
      value={roomName}
      placeholder='enter room name'
      minLength={3}
      maxLength={25}
    />
  );
};

Create.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Create;
