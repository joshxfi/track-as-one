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
import { RoomInput } from '@/components';
import { userInRoom } from '@/utils/functions';
import { useAuth } from '@/contexts/AuthContext';
import { useRoomContext } from '@/contexts/RoomContext';

const RoomInvite = () => {
  const [invUserTag, setUserTag] = useState<string>('');

  const { data } = useAuth();
  const { room, isAdmin } = useRoomContext();

  const inviteUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserTag('');

    if (!invUserTag) {
      toast.error('example → user:Tas_1');
    } else {
      const userToInv = await getDocs(
        query(collection(db, 'users'), where('userTag', '==', invUserTag))
      );

      if (userToInv.empty) {
        toast.error('user tag could not be found');
      } else if (invUserTag === data.userTag) {
        toast.error('you are already in the room');
      } else if (userInRoom(invUserTag, room)) {
        toast.error('user is already in the room');
      } else {
        try {
          await updateDoc(doc(db, `users/${userToInv.docs[0].id}`), {
            invites: arrayUnion(room.id),
          });

          toast.success('User Invited');
        } catch (e: any) {
          toast.error(e.message);
        }
      }
    }
  };

  if (!isAdmin) return <div />;

  return (
    <RoomInput
      title='Invite a User'
      btnLabel='inviteUser'
      Icon={AiOutlineIdcard}
      onSubmit={inviteUser}
      onChange={(e) => setUserTag(e.target.value.trim())}
      value={invUserTag}
      placeholder='enter user tag'
      minLength={10}
      maxLength={10}
    />
  );
};

export default RoomInvite;
