import { db } from '@/config/firebase';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import toast from 'react-hot-toast';
import { BiDoorOpen } from 'react-icons/bi';
import { useDocument } from '@/hooks';

interface InvitationProps {
  roomID: string;
  user: IUser;
}

const Invitation = ({ roomID, user }: InvitationProps) => {
  const { push } = useRouter();
  const [room] = useDocument<IRoom>(doc(db, `rooms/${roomID}`));

  const acceptInvite = async () => {
    if (roomID) {
      await updateDoc(doc(db, `users/${user.id}`), {
        invites: arrayRemove(roomID),
        roomsJoined: arrayUnion(roomID),
      });

      toast.promise(
        updateDoc(doc(db, `rooms/${roomID}`), {
          members: arrayUnion(user.id),
        }),
        {
          loading: 'joining room...',
          success: 'room joined!',
          error: 'could not join room.',
        }
      );

      push(`room/${roomID}`);
    }
  };

  return (
    <button
      type='button'
      onClick={acceptInvite}
      key={roomID}
      className='card w-full text-left btn-ring flex-between h-[70px] mb-2'
    >
      <div className='leading-5'>
        <p className='text-f9'>{room.name}</p>
        <p className='text-sm'>Accept Invitation</p>
      </div>

      <BiDoorOpen className='icon' />
    </button>
  );
};

export default Invitation;
