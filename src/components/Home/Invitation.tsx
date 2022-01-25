import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { BiDoorOpen } from 'react-icons/bi';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useDocument } from '@/hooks';

interface InvitationProps {
  roomId: string;
  user: IUser;
}

const Invitation = ({ roomId, user }: InvitationProps) => {
  const { push } = useRouter();
  const [room] = useDocument<IRoom>(doc(db, `rooms/${roomId}`));

  const acceptInvite = async () => {
    if (roomId) {
      await updateDoc(doc(db, `users/${user.id}`), {
        invites: arrayRemove(roomId),
        roomsJoined: arrayUnion(roomId),
      });

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

      push(`room/${roomId}`);
    }
  };

  return (
    <button
      type='button'
      onClick={acceptInvite}
      key={roomId}
      className='card w-full text-left btn-ring flex-between h-[70px] mb-2'
    >
      <div className='leading-5'>
        <p className='text-f9'>{room?.name}</p>
        <p className='text-sm'>Accept Invitation</p>
      </div>

      <BiDoorOpen className='icon' />
    </button>
  );
};

export default Invitation;
