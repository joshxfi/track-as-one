import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { AiFillCalendar } from 'react-icons/ai';
import { IoMdKey } from 'react-icons/io';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { db } from '@/config/firebase';
import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useRoomContext } from '@/contexts/RoomContext';
import { Layout, Header, Error, Modal } from '@/components';
import { InfoSection, InfoMember } from '@/components/Room';

const Info: React.FC = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [leaveModal, setLeaveModal] = useState(false);

  const { data } = useAuth();
  const { push } = useRouter();
  const { room, tasks } = useRoomContext();
  const { creator, dateAdded, members, admin, isPublic } = room;

  const roomRef = doc(db, `rooms/${room.id}`);

  const deleteRoom = () => {
    setDeleteModal(false);

    setTimeout(async () => {
      try {
        await deleteDoc(roomRef);
        toast.success('Room Deleted');

        push('/home');
        tasks?.forEach(async (task) => {
          await deleteDoc(doc(db, `rooms/${room.id}/tasks/${task.id}`));
        });
      } catch (e: any) {
        toast.error(e.message);
      }
    }, 300);
  };

  const leaveRoom = () => {
    setLeaveModal(false);

    setTimeout(async () => {
      try {
        await updateDoc(roomRef, {
          members: arrayRemove(data.userTag),
        });

        toast.success('Room Left');

        push('/home');
      } catch (e: any) {
        toast.error(e.message);
      }
    }, 300);
  };

  const setRoomVisibility = async () => {
    try {
      await updateDoc(roomRef, {
        isPublic: !isPublic,
      });

      toast.success(`Room is now ${isPublic ? 'private' : 'public'}`);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const copyRoomID = () => {
    navigator.clipboard.writeText(`${room.id}`);
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
        title='Room'
        description='Are you sure you want to delete this room? This action cannot be undone.'
        setIsOpen={setDeleteModal}
        isOpen={deleteModal}
        proceed={{
          action: deleteRoom,
          text: 'Delete Room',
          style: 'bg-red-600',
        }}
      />

      <Modal
        title='Room'
        description='Are you sure you want to leave this room? You need to request or get an invite before you can join again.'
        proceed={{
          action: leaveRoom,
          text: 'Leave Room',
          style: 'bg-red-600',
        }}
        setIsOpen={setLeaveModal}
        isOpen={leaveModal}
      />

      <Header title='Info' backBtn />

      <InfoSection
        title={room.id ?? ''}
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
            <div className='space-x-2'>
              <Button
                className='rounded bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600/90'
                name={`Make ${isPublic ? 'Private' : 'Public'}`}
                onClick={setRoomVisibility}
              />
              <Button
                className='red-btn'
                name='Delete Room'
                onClick={() => setDeleteModal(true)}
              />
            </div>
          ) : (
            <Button
              className='red-btn'
              name='Leave Room'
              onClick={() => setLeaveModal(true)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Info;
