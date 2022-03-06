import React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { useUser } from '@/services';
import { db } from '@/config/firebase';
import { defaultPic } from '@/utils/constants';
import { AiOutlineIdcard } from 'react-icons/ai';
import Confirmation from '../Confirmation';

interface userRequestProps {
  userId: string;
  roomId?: string;
}

const UserRequest = ({ userId, roomId }: userRequestProps) => {
  const [user] = useUser(userId);

  const acceptRequest = async () => {
    toast.promise(
      updateDoc(doc(db, `rooms/${roomId}`), {
        requests: arrayRemove(userId),
        members: arrayUnion(userId),
      }),
      {
        loading: 'accepting request...',
        success: 'request accepted!',
        error: 'could not accept request.',
      }
    );
  };

  const declineRequest = async () => {
    toast.promise(
      updateDoc(doc(db, `rooms/${roomId}`), {
        requests: arrayRemove(userId),
      }),
      {
        loading: 'declining request...',
        success: 'request declined!',
        error: 'could not decline request.',
      }
    );
  };

  return (
    <Confirmation check={acceptRequest} close={declineRequest}>
      <div className='flex'>
        <div className='h-9 w-9 bg-secondary rounded-full mr-4 overflow-hidden'>
          <Image
            src={user?.photoURL ?? defaultPic}
            height={36}
            width={36}
            alt={`${user?.username} profile picture`}
          />
        </div>
        <div className='leading-5'>
          <p className='text-f9'>{user?.username}</p>
          <p className='text-sm'>{user?.id}</p>
        </div>
      </div>
      <AiOutlineIdcard className='icon text-xl' />
    </Confirmation>
  );
};

export default UserRequest;
