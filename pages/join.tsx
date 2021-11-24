import React, { useState } from 'react';
import { VscSignIn } from 'react-icons/vsc';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useAuth } from '@/context/AuthContext';
import { ErrorMsg, Header, Input } from '@/components';
import Container from '@/components/Container';

const Join = () => {
  const [roomID, setRoomID] = useState<string>('');
  const [error, setError] = useState<string>('blank');
  const [showError, setShowError] = useState<boolean>(false);

  const { data } = useAuth();
  const { userTag } = data;

  const errorMsg = (error: string) => {
    setError(error);
    setShowError(true);

    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  const requestJoin = async () => {
    setRoomID('');

    const roomRef = doc(db, 'rooms', roomID)

    const room = await getDoc(roomRef);
    const _room: IRoom = room.data() as IRoom;

    if (!room.exists()) errorMsg('Room does not exist');
    else if (_room.members.includes(userTag))
      errorMsg('You are already a member');
    else if (_room.requests.includes(userTag))
      errorMsg('You already sent a request');
    else if (_room.creator === userTag)
      errorMsg('You are the owner of the room');
    else {
      await updateDoc(roomRef, {
        requests: arrayUnion(userTag),
      });

      errorMsg('Request to join sent!')
    }
  };

  return (
    <Container>
      <Header title='Join a Room' />
      <div className='w-full flex justify-center items-center flex-col'>
        <Input
          handleChange={(e) => setRoomID(e.target.value)}
          value={roomID}
          placeholder='enter room id'
          max={15}
        />
        <ErrorMsg error={error} showError={showError} />

        <div className='inline-block mx-auto mt-2'>
          <button
            type='button'
            onClick={roomID ? requestJoin : () => null}
            className='btn btnEffect'
          >
            <p className='mr-4'>request join</p>
            <VscSignIn className='icon' />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Join;
