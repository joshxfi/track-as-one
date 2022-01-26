import React from 'react';
import { AiFillCalendar } from 'react-icons/ai';
import { IoMdKey } from 'react-icons/io';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import {
  doc,
  deleteDoc,
  updateDoc,
  collection,
  arrayRemove,
  getDocs,
} from 'firebase/firestore';

import { useRoom } from '@/services';
import { useNextQuery } from '@/hooks';
import { db } from '@/config/firebase';
import { InfoBtn } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { Layout, Header, Error } from '@/components';
import { InfoSection, InfoMember, RoomSettings } from '@/components/Room';
import Popup from './Popup';

const Info: React.FC = () => {
  const { data } = useAuth();
  const { push } = useRouter();
  const id = useNextQuery('id');

  const [room, loading] = useRoom(id);
  const { creator, dateAdded, members } = room!;

  const roomRef = doc(db, `rooms/${id}`);

  const deleteRoom = () => {
    toast((t) => (
      <Popup
        proceed={async () => {
          toast.dismiss(t.id);

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
        }}
        dismiss={() => toast.dismiss(t.id)}
      />
    ));
  };

  const leaveRoom = () => {
    toast((t) => (
      <Popup
        proceed={() => {
          if (data.id !== creator) {
            toast.dismiss(t.id);

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
        }}
        dismiss={() => toast.dismiss(t.id)}
      />
    ));
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
        <InfoMember memberId={creator} type='creator' />

        {members?.map((member) => (
          <InfoMember key={member} memberId={member} type='member' />
        ))}

        <div className='flex justify-end'>
          {creator === data.id ? (
            <InfoBtn title='Delete Room' handleClick={deleteRoom} />
          ) : (
            <InfoBtn title='Leave Room' handleClick={leaveRoom} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Info;
