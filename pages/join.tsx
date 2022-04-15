import React, { ReactElement, useState } from 'react';

import toast from 'react-hot-toast';
import { BiDoorOpen } from 'react-icons/bi';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import Layout from '@/components/Layout';
import { RoomInput } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { NextPageWithLayout } from 'types/page';
import { userInRoom } from '@/utils/functions';

const Join: NextPageWithLayout = () => {
  const [roomId, setRoomID] = useState<string>('');

  const {
    data: { userTag },
  } = useAuth();

  const requestJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setRoomID('');

      const roomRef = doc(db, 'rooms', roomId);

      const room = await getDoc(roomRef);
      const _room: IRoom = room.data() as IRoom;

      if (!room.exists()) toast.error('Room Does Not Exist');
      else if (userInRoom(userTag, _room))
        toast.error('You are already a member');
      else if (_room.requests.includes(userTag))
        toast.error('You already sent a request');
      else if (_room.creator === userTag)
        toast.error('You are the owner of the room');
      else {
        await updateDoc(roomRef, {
          requests: arrayUnion(userTag),
        });
        toast.success('Request Sent');
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <RoomInput
      btnLabel='request to join'
      onSubmit={requestJoin}
      onChange={(e) => setRoomID(e.target.value.trim())}
      value={roomId}
      placeholder='enter room id'
      Icon={BiDoorOpen}
      minLength={5}
      maxLength={15}
    />
  );
};

Join.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Join;
