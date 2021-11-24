import React, { useState, useEffect } from 'react';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { AiOutlineIdcard } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Image from 'next/image';

import useRoom from '@/hooks/useRoom';
import { db } from '@/config/firebase';
import { defaultPic } from '@/utils/default';
import { Container, Header } from '@/components';

const Requests = () => {
  const [userReq, setUserReq] = useState<IUser[]>([]);

  const router = useRouter();
  const { id } = router.query;

  const [room] = useRoom(id);
  const { requests, id: roomID } = room;

  useEffect(() => {
    const unsub = () => {
      if (!userReq) {
        requests.forEach(async (userId) => {
          const user = await getDoc(doc(db, `users/${userId}`));
          setUserReq((prevState) => [user.data() as IUser, ...prevState]);
        });
      }
    };

    return unsub();
  }, [requests]);

  const acceptRequest = async ({ userTag, id }: IUser) => {
    await updateDoc(doc(db, `rooms/${roomID}`), {
      requests: arrayRemove(userTag),
      members: arrayUnion(userTag),
    });

    await updateDoc(doc(db, `users/${id}`), {
      roomsJoined: arrayUnion(roomID),
    });
  };

  return (
    <Container>
      <Header title='Requests' />
      <div className='w-full mb-4'>
        {userReq.map((user) => (
          <button
            type='button'
            onClick={() => acceptRequest(user)}
            key={user.userTag}
            className='flex-between card h-[70px] mb-2 btnEffect w-full text-left'
          >
            <div className='flex'>
              <div className='h-9 w-9 bg-secondary rounded-full mr-4 overflow-hidden'>
                <Image
                  src={user?.photoURL ?? defaultPic}
                  height={36}
                  width={36}
                  alt='creator profile picture'
                />
              </div>
              <div className='leading-5'>
                <p className='text-f9'>
                  {user?.username} →
                  <span className='text-secondary'> {user.userTag}</span>
                </p>
                <p className='text-sm'>accept request</p>
              </div>
            </div>
            <AiOutlineIdcard className='icon text-xl' />
          </button>
        ))}
      </div>
    </Container>
  );
};

export default Requests;
