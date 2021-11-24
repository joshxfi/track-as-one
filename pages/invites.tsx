import React from 'react';
import router from 'next/router';
import { doc, updateDoc } from 'firebase/firestore';
import { BiDoorOpen } from 'react-icons/bi';

import { Container, Error, Header } from '@/components';

const Invites: React.FC = () => {
  const userInvites = invites?.map((inv) => inv);
  const matchInvites = roomList.filter((room) =>
    userInvites?.includes(room.roomID)
  );

  const acceptInvite = async (roomTag: string) => {
    const targetRoom = roomList.find((room) => room.roomID === roomTag);

    const currentUserRef = doc(db, 'userList', `${userTag}`);
    const joinRoomRef = doc(db, 'roomList', roomTag);

    await updateDoc(currentUserRef, {
      invites: invites?.filter((invite) => invite !== roomTag),
      roomsJoined: [roomTag, ...(roomsJoined ?? [])],
    });

    await updateDoc(joinRoomRef, {
      members: [userTag, ...targetRoom!.members],
    });

    router.push(`rooms/${roomTag}`);
  };

  return (
    <Container>
      <Header title='Invitation' />
      <div className='w-full mb-4'>
        {matchInvites.length ? (
          matchInvites.map((room) => (
            <button
              type='button'
              onClick={() => acceptInvite(room.roomID)}
              key={room.roomID}
              className='card w-full text-left btnEffect flex-between h-[70px] mb-2'
            >
              <div className='leading-5'>
                <p className='text-f9'>{room.name}</p>
                <p className='text-sm'>Accept Invitation</p>
              </div>

              <BiDoorOpen className='icon' />
            </button>
          ))
        ) : (
          <Error code='204' info='why so empty?' />
        )}
      </div>
    </Container>
  );
};

export default Invites;
