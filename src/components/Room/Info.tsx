import React, { useState, useEffect } from 'react';
import { BsCalendarFill } from 'react-icons/bs';
import { AiOutlineIdcard } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  doc,
  deleteDoc,
  updateDoc,
  collection,
  query,
  where,
  arrayRemove,
  getDocs,
} from 'firebase/firestore';

import useRoom from '@/hooks/useRoom';
import { db } from '@/config/firebase';
import { RoomNav } from '@/components/Room';
import { defaultPic } from '@/utils/default';
import { InfoBtn } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { useCollection, useDocument } from '@/hooks';
import { Layout, Header, Clipboard } from '@/components';

const Info: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [rerender, setRerender] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const { data } = useAuth();

  const [room, loading] = useRoom(id);
  const { creator, dateAdded, requests, id: roomID } = room;

  const creatorRef = doc(db, `users/${creator}`);
  const roomRef = doc(db, `rooms/${roomID}`);

  const [roomCreator] = useDocument<IUser>(creatorRef, {
    deps: [roomID],
  });
  const [roomMembers] = useCollection<IUser>(
    query(
      collection(db, 'users'),
      where('roomsJoined', 'array-contains', roomID ?? '')
    ),
    {
      deps: [roomID],
    }
  );

  useEffect(() => {
    setTimeout(() => {
      setRerender(!rerender);
    });
  }, []);

  const deleteRoom = async () => {
    await deleteDoc(roomRef);

    const roomTasks = await getDocs(collection(db, `rooms/${roomID}/tasks`));
    roomTasks.forEach(async (task) => {
      await deleteDoc(doc(db, `rooms/${roomID}/tasks/${task.id}`));
    });

    await updateDoc(creatorRef, {
      roomsCreated: arrayRemove(roomID),
    });

    router.push('/home');
  };

  const leaveRoom = async () => {
    if (data.id !== creator) {
      await updateDoc(roomRef, {
        members: arrayRemove(data.id),
      });

      await updateDoc(doc(db, `users/${data.id}`), {
        roomsJoined: arrayRemove(roomID),
      });

      router.push('/home');
    }
  };

  const copyRoomID = () => {
    navigator.clipboard.writeText(`${roomID}`);
    setCopied(true);

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Layout loaders={[loading]}>
      <RoomNav room={room} />
      <Header title='Room Info' desc={`room id → ${roomID}`} />

      <div className='card flex-between h-[70px] mb-2 w-full'>
        <div className='leading-5'>
          <p className='text-f9 text-sm'>
            {dateAdded?.toDate().toDateString()}
          </p>
          <p className='text-sm'>room created</p>
        </div>

        <BsCalendarFill className='icon' />
      </div>

      <div className='w-full mb-4'>
        <div className='flex-between card h-[70px] mb-2'>
          <div className='flex'>
            <div className='h-9 w-9 bg-secondary rounded-full mr-4 overflow-hidden'>
              <Image
                src={roomCreator?.photoURL ?? defaultPic}
                height={36}
                width={36}
                alt='creator profile picture'
              />
            </div>
            <div className='leading-5'>
              <p className='text-f9'>{roomCreator?.username}</p>
              <p className='text-sm'>creator</p>
            </div>
          </div>
          <AiOutlineIdcard className='icon text-xl' />
        </div>

        {roomMembers.map((member) => (
          <div key={member.id} className='flex-between card h-[70px] mb-2'>
            <div className='flex'>
              <div className='h-9 w-9 bg-secondary rounded-full mr-4 overflow-hidden'>
                <Image
                  src={member?.photoURL ?? defaultPic}
                  height={36}
                  width={36}
                  alt='creator profile picture'
                />
              </div>
              <div className='leading-5'>
                <p className='text-f9'>{member?.username}</p>
                <p className='text-sm'>member</p>
              </div>
            </div>
            <AiOutlineIdcard className='icon text-xl' />
          </div>
        ))}

        {creator === data?.id ? (
          <>
            <div className='flex'>
              <InfoBtn
                desc='DELETE ROOM'
                styles='mr-2'
                handleClick={deleteRoom}
              />
              <InfoBtn
                desc='GO BACK'
                handleClick={() => router.push(`/rooms/${roomID}`)}
              />
            </div>

            <InfoBtn
              styles='mt-2'
              desc={`VIEW REQUESTS (${requests?.length})`}
              handleClick={() => router.push(`${roomID}?tab=requests`)}
            />
          </>
        ) : (
          <>
            <div className='flex'>
              <InfoBtn
                desc='LEAVE ROOM'
                styles='mr-2'
                handleClick={leaveRoom}
              />
              <InfoBtn
                desc='GO BACK'
                handleClick={() => router.push(`/rooms/${roomID}`)}
              />
            </div>
          </>
        )}
        <InfoBtn desc='COPY ROOM ID' styles='mt-2' handleClick={copyRoomID} />

        <div className='text-center'>
          <Clipboard copied={copied} />
        </div>
      </div>
    </Layout>
  );
};

export default Info;
