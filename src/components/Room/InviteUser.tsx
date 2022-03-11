import React, { useState } from 'react';
import { AiOutlineIdcard } from 'react-icons/ai';
import toast from 'react-hot-toast';
import {
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  collection,
  arrayUnion,
} from 'firebase/firestore';

import { db } from '@/config/firebase';
import { Header, Input } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { useRoomContext } from '@/contexts/RoomContext';

const RoomInvite = () => {
  const [invUserTag, setUserTag] = useState<string>('');

  const { data } = useAuth();
  const { room, roomId, isAdmin } = useRoomContext();

  const inviteUser = async () => {
    setUserTag('');

    if (invUserTag === '') {
      toast.error('example → user:nTWS_');
    } else {
      const userToInv = await getDocs(
        query(collection(db, 'users'), where('userTag', '==', invUserTag))
      );

      if (userToInv.empty) {
        toast.error('user tag could not be found');
      } else if (invUserTag === data.id) {
        toast.error('you are already in the room');
      } else if (room?.members?.includes(invUserTag)) {
        toast.error('user is already in the room');
      } else {
        toast.promise(
          updateDoc(doc(db, `users/${userToInv.docs[0].id}`), {
            invites: arrayUnion(roomId),
          }),
          {
            loading: 'inviting user...',
            success: 'user invited!',
            error: 'could not invite user.',
          }
        );
      }
    }
  };

  if (!isAdmin) return <div />;

  return (
    <>
      <Header title='Invite a User' />
      <form
        spellCheck='false'
        className='flex w-full flex-col items-center justify-center'
      >
        <Input
          onChange={(e) => setUserTag(e.target.value)}
          value={invUserTag}
          placeholder='enter user tag'
          minLength={10}
          maxLength={20}
        />

        <div className='mx-auto mt-2 inline-block'>
          <button onClick={inviteUser} className='btn btn-ring' type='button'>
            <p className='mr-4'>invite user</p>
            <AiOutlineIdcard className='icon' />
          </button>
        </div>
      </form>
    </>
  );
};

export default RoomInvite;
