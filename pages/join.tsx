import React, { ReactElement, useState } from 'react';

import toast from 'react-hot-toast';
import { VscSignIn } from 'react-icons/vsc';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import Layout from '@/components/Layout';
import { RoomInput } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { NextPageWithLayout } from '@/types/page';
import { userInRoom } from '@/utils/functions';

const Join: NextPageWithLayout = () => {
  const [roomId, setRoomID] = useState<string>('');

  const {
    data: { userTag },
  } = useAuth();

  const requestJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRoomID('');

    const roomRef = doc(db, 'rooms', roomId);

    const room = await getDoc(roomRef);
    const _room: IRoom = room.data() as IRoom;

    if (!room.exists()) toast.error('Room Does Not Exist');
    else if (userInRoom(userTag, _room))
      toast.error('You Are Already a Member');
    else if (_room.requests.includes(userTag))
      toast.error('You Already Sent a Request');
    else if (_room.creator === userTag)
      toast.error('You Are the Owner of the Room');
    else {
      toast.promise(
        updateDoc(roomRef, {
          requests: arrayUnion(userTag),
        }),
        {
          loading: 'Sending Request...',
          success: 'Request Sent!',
          error: 'Request Could not be Sent.',
        }
      );
    }
  };

  return (
    <RoomInput
      title='Join a Room'
      btnLabel='request join'
      Icon={VscSignIn}
      onSubmit={requestJoin}
      onChange={(e) => setRoomID(e.target.value)}
      value={roomId}
      placeholder='enter room id'
      minLength={5}
      maxLength={15}
    />
  );
};

Join.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Join;
