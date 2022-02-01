import React, { ReactElement, useState } from 'react';

import toast from 'react-hot-toast';
import { VscSignIn } from 'react-icons/vsc';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import Layout from '@/components/Layout';
import { Header, Input } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { NextPageWithLayout } from '@/types/page';

const Join: NextPageWithLayout = () => {
  const [roomId, setRoomID] = useState<string>('');

  const {
    data: { id },
  } = useAuth();

  const requestJoin = async () => {
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
    <>
      <Header title='Join a Room' />
      <div className='w-full flex justify-center items-center flex-col'>
        <Input
          onChange={(e) => setRoomID(e.target.value)}
          value={roomId}
          placeholder='enter room id'
          minLength={5}
          maxLength={15}
        />

        <div className='inline-block mx-auto mt-2'>
          <button
            type='button'
            onClick={roomId ? requestJoin : () => null}
            className='btn btn-ring'
          >
            <p className='mr-4'>request join</p>
            <VscSignIn className='icon' />
          </button>
        </div>
      </div>
    </>
  );
};

Join.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Join;
