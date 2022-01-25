import React from 'react';

import { collection, query, where } from 'firebase/firestore';
import { AiOutlineIdcard } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { BsEye } from 'react-icons/bs';
import toast from 'react-hot-toast';
import Image from 'next/image';

import { Layout } from '@/components';
import { db } from '@/config/firebase';
import { useCollection } from '@/hooks';
import { MyRooms } from '@/components/Home';
import { defaultPic } from '@/utils/default';
import { Button } from '@/components/Button';
import { useCreatedRooms } from '@/services';
import { useAuth } from '@/context/AuthContext';

const Homepage: React.FC = () => {
  const { push } = useRouter();
  const {
    data: { id, username, photoURL },
    loading,
  } = useAuth();

  const roomRef = collection(db, 'rooms');
  const deps = { deps: [loading] };

  const [createdRooms, crLoading] = useCreatedRooms(id);
  const [joinedRooms, jrLoading] = useCollection<IRoom>(
    query(roomRef, where('members', 'array-contains', id ?? '')),
    deps
  );

  const copyTag = () => {
    navigator.clipboard.writeText(id ?? '');
    toast.success('copied to clipboard');
  };

  return (
    <Layout loaders={[crLoading, jrLoading]} className='mb-16'>
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

      <div className='primary-gradient h-[2px] my-4 w-full' />

      <div className='flex-between space-x-2'>
        <Button
          name='copy tag'
          onClick={copyTag}
          className='sq-btn'
          iconStyles='text-secondary text-xl'
          Icon={AiOutlineIdcard}
        />

        <Button
          name='view invites'
          onClick={() => push('/invites')}
          className='sq-btn'
          iconStyles='text-secondary text-xl'
          Icon={BsEye}
        />
      </div>

      <MyRooms createdRooms={createdRooms} joinedRooms={joinedRooms} />
    </Layout>
  );
};

export default Homepage;
