import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { BiDoorOpen } from 'react-icons/bi';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { useRoom } from '@/services';
import { db } from '@/config/firebase';
import { Confirmation } from '@/components';
import { userInRoom } from '@/utils/functions';
import { useAuth } from '@/contexts/AuthContext';

const Invitation = ({ roomId }: { roomId: string }) => {
  const { data } = useAuth();
  const { push } = useRouter();
  const [room] = useRoom(roomId);

  const userRef = doc(db, `users/${data.id}`);

  const acceptInvite = async () => {
    if (userInRoom(data.userTag, room)) {
      toast.error('You Are Already a Member');
      await updateDoc(userRef, {
        invites: arrayRemove(roomId),
      });
      return;
    }

    try {
      await Promise.all([
        updateDoc(doc(db, `rooms/${roomId}`), {
          members: arrayUnion(data.userTag),
        }),
        updateDoc(userRef, {
          invites: arrayRemove(roomId),
        }),
      ]);

      toast.success('Room Joined');
      push('/home');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const declineInvite = async () => {
    try {
      await updateDoc(userRef, {
        invites: arrayRemove(roomId),
      });
      toast.success('Invite Declined');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <Confirmation close={declineInvite} check={acceptInvite}>
      <div className='leading-5'>
        <p className='text-f9'>{room.name}</p>
        <p className='text-sm'>room id: {room.id}</p>
      </div>

      <BiDoorOpen className='icon' />
    </Confirmation>
  );
};

export default Invitation;
