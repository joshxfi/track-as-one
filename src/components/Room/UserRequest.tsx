import React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { useUser } from '@/services';
import { db } from '@/config/firebase';
import { defaultPic } from '@/utils/default';
import { AiOutlineIdcard } from 'react-icons/ai';

interface userRequestProps {
  userId: string;
  roomId?: string;
}

const UserRequest = ({ userId, roomId }: userRequestProps) => {
  const [user] = useUser(userId);
  const { push, query } = useRouter();

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

    push({ query: { ...query, tab: 'info' } });
  };

  return (
    <button
      type='button'
      onClick={acceptRequest}
      className='flex-between card h-[70px] mb-2 btn-ring w-full text-left'
    >
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
          <p className='text-f9'>
            {user?.username} →
            <span className='text-secondary'> {user?.id}</span>
          </p>
          <p className='text-sm'>accept request</p>
        </div>
      </div>
      <AiOutlineIdcard className='icon text-xl' />
    </button>
  );
};

export default UserRequest;
