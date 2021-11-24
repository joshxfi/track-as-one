import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AiOutlineIdcard } from 'react-icons/ai';
import { doc, updateDoc } from 'firebase/firestore';

import { Container, Header, Error } from '@/components';

const Requests = () => {
  const router = useRouter();
  const { id } = router.query;

  const currentRoom = roomList.find((room) => room.roomID === id);
  const { members, requests, roomID } = currentRoom || {};

  const matchUsers = userList.filter((user) =>
    requests?.includes(user.userTag as string)
  );

  const acceptRequest = async ({ userTag, roomsJoined }: IUser) => {
    if (currentRoom) {
      const currentRoomRef = doc(db, 'roomList', `${roomID}`);
      const targetUserRef = doc(db, 'userList', `${userTag}`);

      const newReqs = requests?.filter((req) => req !== userTag);

      await updateDoc(currentRoomRef, {
        requests: newReqs,
        members: [userTag, ...(members ?? [])],
      });

      await updateDoc(targetUserRef, {
        roomsJoined: [roomID, ...roomsJoined],
      });
    }
  };

  return (
    <Container>
      <Header title='Requests' />
      <div className='w-full mb-4'>
        {requests?.length ? (
          matchUsers.map((user) => (
            <button
              type='button'
              onClick={() => acceptRequest(user)}
              key={user.userTag}
              className='flex-between card h-[70px] mb-2 btnEffect w-full text-left'
            >
              <div className='flex'>
                <div className='h-9 w-9 bg-secondary rounded-full mr-4 overflow-hidden'>
                  <Image
                    src={user?.photoURL || defaultPic}
                    height={36}
                    width={36}
                    alt='creator profile picture'
                  />
                </div>
                <div className='leading-5'>
                  <p className='text-f9'>
                    {user?.displayName} →
                    <span className='text-secondary'> {user.userTag}</span>
                  </p>
                  <p className='text-sm'>accept request</p>
                </div>
              </div>
              <AiOutlineIdcard className='icon text-xl' />
            </button>
          ))
        ) : (
          <Error code='204' info='why so empty?' />
        )}
      </div>
    </Container>
  );
};

export default Requests;
