import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { BsEye } from 'react-icons/bs';
import Image from 'next/image';

import { MyRooms } from '@/components/Home';
import { defaultPic } from '@/utils/default';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { Clipboard, Layout } from '@/components';
import { AiOutlineIdcard } from 'react-icons/ai';
import { collection, query, where } from 'firebase/firestore';
import { useCollection } from '@/hooks';
import { db } from '@/config/firebase';

const Homepage: React.FC = () => {
  const { push } = useRouter();
  const {
    data: { id, username, photoURL },
    loading,
  } = useAuth();
  const [copied, setCopied] = useState<boolean>(false);

  const roomRef = collection(db, 'rooms');
  const deps = { deps: [loading] };

  const [createdRooms, crLoading] = useCollection<IRoom>(
    query(roomRef, where('creator', '==', id ?? '')),
    deps
  );
  const [joinedRooms, jrLoading] = useCollection<IRoom>(
    query(roomRef, where('members', 'array-contains', id ?? '')),
    deps
  );

  const copyTag = () => {
    navigator.clipboard.writeText(id ?? '');
    setCopied(true);

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Layout loaders={[crLoading, jrLoading]}>
      <div className='flex flex-col items-center mt-8 w-full space-y-4'>
        <div className='h-[100px] w-[100px] rounded-full p-2 primary-gradient'>
          <Image
            src={photoURL ?? defaultPic}
            height={100}
            width={100}
            objectFit='cover'
            className='rounded-full'
            alt='profile picture'
          />
        </div>

        <div className='text-center'>
          <div>
            <h1 className='text-2xl font-bold'>{username}</h1>
            <p>{id}</p>
          </div>
        </div>
      </div>

      <div className='bg-gradient-to-tr from-secondary to-[#FFDC54] h-[2px] my-4 w-full' />

      <MyRooms createdRooms={createdRooms} joinedRooms={joinedRooms} />

      <div className='flex-between space-x-2'>
        <Button
          name='copy tag'
          onClick={copyTag}
          className='sq-btn btn-effect'
          iconStyles='text-secondary text-xl'
          Icon={AiOutlineIdcard}
        />

        <Button
          name='view invites'
          onClick={() => push('/invites')}
          className='sq-btn btn-effect'
          iconStyles='text-secondary text-xl'
          Icon={BsEye}
        />
      </div>

      <div className='grid place-items-center'>
        <Clipboard copied={copied} />
      </div>
    </Layout>
  );
};

export default Homepage;
