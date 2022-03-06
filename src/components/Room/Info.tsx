import React, { useState } from 'react';
import { AiFillCalendar } from 'react-icons/ai';
import { IoMdKey } from 'react-icons/io';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { InfoBtn } from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useRoomContext } from '@/contexts/RoomContext';
import { Layout, Header, Error, Modal } from '@/components';
import { InfoSection, InfoMember, RoomMenu } from '@/components/Room';

const Info: React.FC = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [leaveModal, setLeaveModal] = useState(false);

  const { data } = useAuth();
  const { push } = useRouter();
  const { room, roomId, tasks } = useRoomContext();

  const { creator, dateAdded, members, admin } = room!;

  const roomRef = doc(db, `rooms/${roomId}`);

  const deleteRoom = async () => {
    setDeleteModal(false);

    setTimeout(() => {
      toast.promise(deleteDoc(roomRef), {
        loading: 'Deleting Room...',
        success: 'Room Deleted',
        error: 'Error Deleting Room',
      });
    }, 300);

    tasks?.forEach(async (task) => {
      await deleteDoc(doc(db, `rooms/${roomId}/tasks/${task.id}`));
    });

    push('/home');
  };

  const leaveRoom = () => {
    setLeaveModal(false);

    setTimeout(() => {
      toast.promise(
        updateDoc(roomRef, {
          members: arrayRemove(data.userTag),
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
    navigator.clipboard.writeText(`${roomId}`);
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
    <>
      <Modal
        title='Delete Room'
        description='Are you sure you want to delete this room? This action cannot be undone.'
        setIsOpen={setDeleteModal}
        isOpen={deleteModal}
        buttons={
          <button
            type='button'
            onClick={deleteRoom}
            className='modal-btn bg-red-600'
          >
            Delete
          </button>
        }
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
        title={roomId ?? ''}
        label='room id'
        onClick={copyRoomID}
        Icon={IoMdKey}
      />

      <InfoSection
        title={dateAdded?.toDate().toDateString()}
        label='room created'
        Icon={AiFillCalendar}
      />

      <div className='mb-4 w-full'>
        <InfoMember memberId={creator} type='creator' />

        {admin?.map((_admin) => (
          <InfoMember key={_admin} memberId={_admin} type='admin' />
        ))}

        {members?.map((member) => (
          <InfoMember key={member} memberId={member} type='member' />
        ))}

        <div className='flex justify-end'>
          {creator === data.userTag ? (
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
    </>
  );
};

export default Info;
