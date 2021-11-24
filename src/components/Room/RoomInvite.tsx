import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { AiOutlineIdcard } from 'react-icons/ai';

import useRoom from '@/hooks/useRoom';
import { db } from '@/config/firebase';
import { RoomNav } from '@/components/Room';
import { useAuth } from '@/context/AuthContext';
import { ErrorMsg, Container, Header, Input } from '@/components';

const RoomInvite = () => {
  const [invUserTag, setUserTag] = useState<string>('');
  const [error, setError] = useState<string>('blank');
  const [showError, setShowError] = useState<boolean>(false);

  const errorMsg = (error: string) => {
    setError(error);
    setShowError(true);

    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  const router = useRouter();
  const { id } = router.query;

  const { data } = useAuth();

  const [room] = useRoom(id);
  const inviteUser = async () => {
    setUserTag('');

    if (invUserTag === '') {
      errorMsg('example → user:nTWS_');
    } else {
      const invUserRef = query(
        collection(db, 'users'),
        where('userTag', '==', invUserTag)
      );
      const getUser = await getDocs(invUserRef);

      const user: IUser = getUser.docs.map((user) => {
        return { ...user.data(), id: user.id } as IUser;
      })[0];

      if (invUserTag === data?.userTag) {
        errorMsg('you are already in the room');
      } else if (room.members?.includes(invUserTag)) {
        errorMsg('user is already in the room');
      } else if (user.userTag) {
        await updateDoc(doc(db, 'users', user.id), {
          invites: arrayUnion(id),
        });
        errorMsg('user invited!');
      } else errorMsg('user tag could not be found');
    }
  };

  return (
    <Container>
      <RoomNav room={room} />
      <Header title='Invite a User' />
      <form
        spellCheck='false'
        className='w-full flex justify-center items-center flex-col'
      >
        <Input
          handleChange={(e) => setUserTag(e.target.value)}
          value={invUserTag}
          placeholder='enter user tag'
          max={10}
        />
        <ErrorMsg error={error} showError={showError} />

        <div className='inline-block mx-auto mt-2'>
          <button onClick={inviteUser} className='btn btnEffect' type='button'>
            <p className='mr-4'>invite user</p>
            <AiOutlineIdcard className='icon' />
          </button>
        </div>
      </form>
    </Container>
  );
};

export default RoomInvite;