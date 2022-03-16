import React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useUserByTag } from '@/services';
import { Confirmation } from '@/components';
import { defaultPic } from '@/utils/constants';
import { userInRoom } from '@/utils/functions';
import { AiOutlineIdcard } from 'react-icons/ai';
import { useRoomContext } from '@/contexts/RoomContext';

const UserRequest = ({ userId }: { userId: string }) => {
  const { room } = useRoomContext();
  const [user] = useUserByTag(userId);
  const roomRef = doc(db, `rooms/${room.id}`);

  const acceptRequest = async () => {
    if (userInRoom(user.userTag, room)) {
      toast.error('User is Already a Member');
      await updateDoc(roomRef, {
        requests: arrayRemove(userId),
      });
      return;
    }

    try {
      await updateDoc(roomRef, {
        requests: arrayRemove(userId),
        members: arrayUnion(userId),
      });

      toast.success('Request Accepted');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const declineRequest = async () => {
    try {
      await updateDoc(roomRef, {
        requests: arrayRemove(userId),
      });
      toast.success('Request Declined');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Confirmation check={acceptRequest} close={declineRequest}>
      <div className='flex'>
        <div className='mr-4 h-9 w-9 overflow-hidden rounded-full bg-secondary'>
          <Image
            src={user?.photoURL ?? defaultPic}
            height={36}
            width={36}
            alt={`${user?.username} profile picture`}
          />
        </div>
        <div className='leading-5'>
          <p className='text-f9'>{user?.username}</p>
          <p className='text-sm'>{user?.userTag}</p>
        </div>
      </div>
      <AiOutlineIdcard className='icon text-xl' />
    </Confirmation>
  );
};

export default UserRequest;
