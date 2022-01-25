import React, { useState, useEffect } from 'react';
import { AiFillCalendar } from 'react-icons/ai';
import { IoMdKey } from 'react-icons/io';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
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

import { useRoom, useUser } from '@/services';
import { db } from '@/config/firebase';
import { defaultPic } from '@/utils/default';
import { InfoBtn } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { Layout, Header, Error } from '@/components';
import { useCollection, useDocument, useNextQuery } from '@/hooks';
import { InfoSection, InfoMember, RoomSettings } from '@/components/Room';

const Info: React.FC = () => {
  const [rerender, setRerender] = useState(false);

  const { push, query: q } = useRouter();
  const id = useNextQuery('id');
  const { data } = useAuth();

  const [room, loading] = useRoom(id);
  const { creator, dateAdded, requests } = room!;

  const roomRef = doc(db, `rooms/${id}`);

  const [roomCreator] = useUser(creator);
  const [roomMembers] = useCollection<IUser>(
    query(
      collection(db, 'users'),
      where('roomsJoined', 'array-contains', id ?? '')
    ),
    {
      deps: [id],
    }
  );

  useEffect(() => {
    setTimeout(() => {
      setRerender(!rerender);
    });
  }, []);

  const deleteRoom = async () => {
    toast.promise(deleteDoc(roomRef), {
      loading: 'deleting room...',
      success: 'room deleted',
      error: 'error deleting room',
    });

    const roomTasks = await getDocs(collection(db, `rooms/${id}/tasks`));
    roomTasks.forEach(async (task) => {
      await deleteDoc(doc(db, `rooms/${id}/tasks/${task.id}`));
    });

    push('/home');
  };

  const leaveRoom = async () => {
    if (data.id !== creator) {
      toast.promise(
        updateDoc(roomRef, {
          members: arrayRemove(data.id),
        }),
        {
          loading: 'leaving room...',
          success: 'left room',
          error: 'error leaving room',
        }
      );

      push('/home');
    }
  };

  const copyRoomID = () => {
    navigator.clipboard.writeText(`${id}`);
    toast.success('copied to clipboard');
  };

  if (!room) {
    return (
      <Layout>
        <Error code='404' info='room not found' />
      </Layout>
    );
  }

  return (
    <Layout loaders={[loading]}>
      <RoomSettings room={room!} />
      <Header title='Room Info' />

      <InfoSection
        title={id ?? ''}
        label='room id'
        onClick={copyRoomID}
        Icon={IoMdKey}
      />

      <InfoSection
        title={dateAdded?.toDate().toDateString()}
        label='room created'
        Icon={AiFillCalendar}
      />

      <div className='w-full mb-4'>
        <InfoMember
          img={roomCreator?.photoURL ?? defaultPic}
          username={roomCreator?.username ?? ''}
          label='creator'
        />

        {roomMembers.map((member) => (
          <InfoMember
            key={member.id}
            img={member.photoURL ?? defaultPic}
            username={member.username ?? ''}
          />
        ))}

        {creator === data.id && (
          <InfoBtn
            className='mb-2'
            desc={`VIEW REQUESTS (${requests?.length})`}
            handleClick={() => push({ query: { ...q, tab: 'requests' } })}
          />
        )}

        <div className='flex'>
          {creator === data.id ? (
            <InfoBtn
              desc='DELETE ROOM'
              className='info-red-btn'
              handleClick={deleteRoom}
            />
          ) : (
            <InfoBtn
              desc='LEAVE ROOM'
              className='info-red-btn'
              handleClick={leaveRoom}
            />
          )}

          <InfoBtn
            desc='GO BACK'
            className='bg-secondary text-primary'
            handleClick={() => push({ pathname: '/room', query: { id } })}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Info;
