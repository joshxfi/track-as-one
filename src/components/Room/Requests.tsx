import React, { useState, useEffect } from 'react';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  documentId,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { AiOutlineIdcard } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import Image from 'next/image';

import { useRoom } from '@/services';
import { db } from '@/config/firebase';
import { useCollection } from '@/hooks';
import { defaultPic } from '@/utils/default';
import { Layout, Header, EmptyMsg } from '@/components';

const Requests = () => {
  const [reqs, setReqs] = useState<string[]>(['default']);

  const router = useRouter();
  const { id } = router.query;

  const [room, loading] = useRoom(id);

  useEffect(() => {
    if (room?.requests?.length) setReqs(room?.requests);
  }, [loading]);

  const [users] = useCollection<IUser>(
    query(collection(db, 'users'), where(documentId(), 'in', reqs)),
    { listen: true, deps: [reqs] }
  );

  const acceptRequest = async (id: string | undefined) => {
    await updateDoc(doc(db, `rooms/${room?.id}`), {
      requests: arrayRemove(id),
      members: arrayUnion(id),
    });

    await updateDoc(doc(db, `users/${id}`), {
      roomsJoined: arrayUnion(room?.id),
    });
  };

  return (
    <Layout loaders={[loading]}>
      <Header title='Requests' />
      {!users.length && <EmptyMsg empty='requests' />}
      <div className='w-full mb-4'>
        {users.map((user) => (
          <button
            key={nanoid()}
            type='button'
            onClick={() => acceptRequest(user?.id)}
            className='flex-between card h-[70px] mb-2 btn-ring w-full text-left'
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
                  <span className='text-secondary'> {user?.id}</span>
                </p>
                <p className='text-sm'>accept request</p>
              </div>
            </div>
            <AiOutlineIdcard className='icon text-xl' />
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default Requests;
