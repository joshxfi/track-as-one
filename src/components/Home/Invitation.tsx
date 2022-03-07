import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { BiDoorOpen } from 'react-icons/bi';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { useRoom } from '@/services';
import { db } from '@/config/firebase';
import Confirmation from '../Confirmation';

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
          members: arrayUnion(user.userTag),
        }),
        {
          loading: 'Joining Room...',
          success: 'Room Joined!',
          error: 'Could Not Join Room.',
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
          loading: 'Declining Invite...',
          success: 'Invite Declined!',
          error: 'Could Not Decline Invite.',
        }
      );
    }
  };

  return (
    <Confirmation close={declineInvite} check={acceptInvite}>
      <div className='leading-5'>
        <p className='text-f9'>{room?.name}</p>
        <p className='text-sm'>room id: {room?.id}</p>
      </div>

      <BiDoorOpen className='icon' />
    </Confirmation>
  );
};

export default Invitation;
