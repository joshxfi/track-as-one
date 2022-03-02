import React, { ReactElement, useState } from 'react';

import toast from 'react-hot-toast';
import { VscSignIn } from 'react-icons/vsc';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import Layout from '@/components/Layout';
import { RoomInput } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { NextPageWithLayout } from '@/types/page';

const Join: NextPageWithLayout = () => {
  const [roomId, setRoomID] = useState<string>('');

  const {
    data: { id },
  } = useAuth();

  const requestJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRoomID('');

    const roomRef = doc(db, 'rooms', roomId);

    const room = await getDoc(roomRef);
    const _room: IRoom = room.data() as IRoom;

    if (!room.exists()) toast.error('room does not exist');
    else if (_room.members.includes(id!))
      toast.error('you are already a member');
    else if (_room.requests.includes(id!))
      toast.error('you already sent a request');
    else if (_room.creator === id) toast.error('You are the owner of the room');
    else {
      toast.promise(
        updateDoc(roomRef, {
          requests: arrayUnion(id),
        }),
        {
          loading: 'Sending Request...',
          success: 'Request Sent!',
          error: 'Request Could not be Sent.',
        }
      );
    }
  };

  return (
    <RoomInput
      title='Join a Room'
      btnLabel='request join'
      Icon={VscSignIn}
      onSubmit={requestJoin}
      onChange={(e) => setRoomID(e.target.value)}
      value={roomId}
      placeholder='enter room id'
    />
  );
};

Join.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Join;
