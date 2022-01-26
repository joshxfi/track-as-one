import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { BiDoorOpen } from 'react-icons/bi';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { useRoom } from '@/services';
import { db } from '@/config/firebase';
import PendingContainer from '../PendingContainer';

interface InvitationProps {
  roomId: string;
  user: IUser;
}

const Invitation = ({ roomId, user }: InvitationProps) => {
  const { push } = useRouter();
  const [room] = useRoom(roomId);

  const userRef = doc(db, `users/${user.id}`);

  const acceptInvite = async () => {
    if (roomId) {
      toast.promise(
        updateDoc(doc(db, `rooms/${roomId}`), {
          members: arrayUnion(user.id),
        }),
        {
          loading: 'joining room...',
          success: 'room joined!',
          error: 'could not join room.',
        }
      );

      await updateDoc(userRef, {
        invites: arrayRemove(roomId),
      });

      push('/home');
    }
  };

  const declineInvite = async () => {
    if (roomId) {
      toast.promise(
        updateDoc(userRef, {
          invites: arrayRemove(roomId),
        }),
        {
          loading: 'declining invite...',
          success: 'invite declined!',
          error: 'could not decline invite.',
        }
      );
    }
  };

  return (
    <PendingContainer close={declineInvite} check={acceptInvite}>
      <div className='leading-5'>
        <p className='text-f9'>{room?.name}</p>
        <p className='text-sm'>room id: {room?.id}</p>
      </div>

      <BiDoorOpen className='icon' />
    </PendingContainer>
  );
};

export default Invitation;
