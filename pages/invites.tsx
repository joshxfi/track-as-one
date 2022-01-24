import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
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
import { BiDoorOpen } from 'react-icons/bi';

import { db } from '@/config/firebase';
import { useCollection } from '@/hooks';
import { useAuth } from '@/context/AuthContext';
import { Layout, Header, EmptyMsg } from '@/components';

const Invites: React.FC = () => {
  const [invs, setInvs] = useState<string[]>(['empty']);
  const { data, loading } = useAuth();

  const { push } = useRouter();

  useEffect(() => {
    if (data?.invites?.length) setInvs(data.invites);
  }, [loading]);

  const [invites] = useCollection<IRoom>(
    query(collection(db, 'rooms'), where(documentId(), 'in', invs)),
    { listen: true, deps: [data] }
  );

  const acceptInvite = async (roomId?: string) => {
    if (roomId) {
      await updateDoc(doc(db, `users/${data.id}`), {
        invites: arrayRemove(roomId),
        roomsJoined: arrayUnion(roomId),
      });

      toast.promise(
        updateDoc(doc(db, `rooms/${roomId}`), {
          members: arrayUnion(data.id),
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
    <Layout>
      <Header title='Invitation' />
      {!invites.length && <EmptyMsg empty='invites' />}
      <div className='w-full mb-4'>
        {invites.map((room) => (
          <button
            type='button'
            onClick={() => acceptInvite(room.id)}
            key={room.id}
            className='card w-full text-left btn-ring flex-between h-[70px] mb-2'
          >
            <div className='leading-5'>
              <p className='text-f9'>{room.name}</p>
              <p className='text-sm'>Accept Invitation</p>
            </div>

            <BiDoorOpen className='icon' />
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default Invites;
