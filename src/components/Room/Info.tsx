import React, { useState } from 'react';

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
import { Layout, Header, Error, Modal } from '@/components';
import { InfoSection, InfoMember, RoomMenu } from '@/components/Room';

const Info: React.FC = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [leaveModal, setLeaveModal] = useState(false);

  const { data } = useAuth();
  const { push } = useRouter();
  const id = useNextQuery('id');

  const [room, loading] = useRoom(id);
  const { creator, dateAdded, members } = room!;

  const roomRef = doc(db, `rooms/${id}`);

  const deleteRoom = async () => {
    setDeleteModal(false);

    setTimeout(() => {
      toast.promise(deleteDoc(roomRef), {
        loading: 'Deleting Room...',
        success: 'Room Deleted',
        error: 'Error Deleting Room',
      });
    }, 300);

    const roomTasks = await getDocs(collection(db, `rooms/${id}/tasks`));
    roomTasks.forEach(async (task) => {
      await deleteDoc(doc(db, `rooms/${id}/tasks/${task.id}`));
    });

    push('/home');
  };

  const leaveRoom = () => {
    setLeaveModal(false);

    setTimeout(() => {
      toast.promise(
        updateDoc(roomRef, {
          members: arrayRemove(data.id),
        }),
        {
          loading: 'Leaving Room...',
          success: 'Room Left',
          error: 'Error Leaving Room',
        }
      );
      push('/home');
    }, 300);
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
      <Modal
        title='Delete Room'
        description='Are you sure you want to delete this room? This action cannot be undone.'
        proceed={deleteRoom}
        setIsOpen={setDeleteModal}
        isOpen={deleteModal}
      />

      <Modal
        title='Leave Room'
        description='Are you sure you want to leave this room? You need to request or get an invite before you can join again.'
        proceed={leaveRoom}
        setIsOpen={setLeaveModal}
        isOpen={leaveModal}
      />

      <RoomMenu room={room!} />
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
            <InfoBtn
              title='Delete Room'
              handleClick={() => setDeleteModal(true)}
            />
          ) : (
            <InfoBtn
              title='Leave Room'
              handleClick={() => setLeaveModal(true)}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Info;
