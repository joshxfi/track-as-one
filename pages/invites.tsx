import React, { useState, useEffect } from 'react';
import router from 'next/router';
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
import { Container, Header } from '@/components';

const Invites: React.FC = () => {
  const [invs, setInvs] = useState<string[]>(['default']);
  const { user, data, loading } = useAuth();

  useEffect(() => {
    if (data?.invites?.length) setInvs(data.invites);
  }, [loading]);

  const [invites] = useCollection<IRoom>(
    query(collection(db, 'rooms'), where(documentId(), 'in', invs)),
    { listen: true, deps: [invs] }
  );

  const acceptInvite = async (roomId?: string) => {
    if (roomId) {
      await updateDoc(doc(db, `users/${user?.uid}`), {
        invites: arrayRemove(roomId),
        roomsJoined: arrayUnion(roomId),
      });

      await updateDoc(doc(db, `rooms/${roomId}`), {
        members: arrayUnion(data.userTag),
      });

      router.push(`rooms/${roomId}`);
    }
  };

  return (
    <Container>
      <Header title='Invitation' />
      <div className='w-full mb-4'>
        {invites.map((room) => (
          <button
            type='button'
            onClick={() => acceptInvite(room.id)}
            key={room.id}
            className='card w-full text-left btnEffect flex-between h-[70px] mb-2'
          >
            <div className='leading-5'>
              <p className='text-f9'>{room.name}</p>
              <p className='text-sm'>Accept Invitation</p>
            </div>

            <BiDoorOpen className='icon' />
          </button>
        ))}
      </div>
    </Container>
  );
};

export default Invites;
