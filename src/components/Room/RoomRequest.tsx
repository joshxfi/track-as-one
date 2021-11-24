import React, { useState, useEffect } from 'react';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { AiOutlineIdcard } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import Image from 'next/image';

import useRoom from '@/hooks/useRoom';
import { db } from '@/config/firebase';
import { useCollection } from '@/hooks';
import { defaultPic } from '@/utils/default';
import { Container, Header } from '@/components';

const Requests = () => {
  const [reqs, setReqs] = useState<string[]>(['default']);

  const router = useRouter();
  const { id } = router.query;

  const [room, loading] = useRoom(id);

  useEffect(() => {
    if (room.requests?.length) setReqs(room.requests);
  }, [loading]);

  const [users] = useCollection<IUser>(
    query(collection(db, 'users'), where('userTag', 'in', reqs)),
    { deps: [reqs] }
  );

  const acceptRequest = async ({ userTag, id }: IUser) => {
    await updateDoc(doc(db, `rooms/${room.id}`), {
      requests: arrayRemove(userTag),
      members: arrayUnion(userTag),
    });

    await updateDoc(doc(db, `users/${id}`), {
      roomsJoined: arrayUnion(room.id),
    });
  };

  return (
    <Container>
      <Header title='Requests' />
      <div className='w-full mb-4'>
        {users.map((user) => (
          <button
            key={nanoid()}
            type='button'
            onClick={() => acceptRequest(user)}
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
                  <span className='text-secondary'> {user?.userTag}</span>
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
