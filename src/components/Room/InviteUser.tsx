import React, { useState } from 'react';

import toast from 'react-hot-toast';
import { AiOutlineIdcard } from 'react-icons/ai';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

import useRoom from '@/hooks/useRoom';
import { useNextQuery } from '@/hooks';
import { db } from '@/config/firebase';
import { useAuth } from '@/context/AuthContext';
import { RoomSettings } from '@/components/Room';
import { Layout, Header, Input } from '@/components';

const RoomInvite = () => {
  const [invUserTag, setUserTag] = useState<string>('');

  const id = useNextQuery('id');
  const { data } = useAuth();

  const [room] = useRoom(id);
  const inviteUser = async () => {
    setUserTag('');

    if (invUserTag === '') {
      toast.error('example → user:nTWS_');
    } else {
      const userToInv = await getDoc(doc(db, 'users', invUserTag));

      if (!userToInv.exists()) {
        toast.error('user tag could not be found');
      } else if (invUserTag === data.id) {
        toast.error('you are already in the room');
      } else if (room?.members?.includes(invUserTag)) {
        toast.error('user is already in the room');
      } else {
        toast.promise(
          updateDoc(doc(db, `users/${userToInv.id}`), {
            invites: arrayUnion(id),
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

  return (
    <Layout>
      <RoomSettings room={room!} />
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

        <div className='inline-block mx-auto mt-2'>
          <button onClick={inviteUser} className='btn btn-ring' type='button'>
            <p className='mr-4'>invite user</p>
            <AiOutlineIdcard className='icon' />
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default RoomInvite;
