import React from 'react';

import { collection, query, where } from 'firebase/firestore';
import { AiOutlineIdcard } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { BsEye } from 'react-icons/bs';
import toast from 'react-hot-toast';
import Image from 'next/image';

import { Layout } from '@/components';
import { db } from '@/config/firebase';
import { useCol } from '@/hooks';
import { MyRooms } from '@/components/Home';
import { defaultPic } from '@/utils/constants';
import { Button } from '@/components/Button';
import { useCreatedRooms } from '@/services';
import { useAuth } from '@/context/AuthContext';

const Homepage: React.FC = () => {
  const { push } = useRouter();
  const {
    data: { username, photoURL, userTag },
  } = useAuth();

  const [createdRooms, crLoading] = useCreatedRooms(userTag);
  const [joinedRooms, jrLoading] = useCol<IRoom>(
    query(
      collection(db, 'rooms'),
      where('members', 'array-contains', userTag ?? '')
    )
  );
  const [joinedRoomsAsAdmin, jraLoading] = useCol<IRoom>(
    query(
      collection(db, 'rooms'),
      where('admin', 'array-contains', userTag ?? '')
    )
  );

  const copyTag = () => {
    navigator.clipboard.writeText(userTag ?? '');
    toast.success('copied to clipboard');
  };

  return (
    <Layout loaders={[crLoading, jrLoading, jraLoading]} className='mb-16'>
      <div className='mt-8 flex w-full flex-col items-center space-y-4'>
        <div className='primary-gradient h-[100px] w-[100px] rounded-full p-2'>
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
            <p>{userTag}</p>
          </div>
        </div>
      </div>

      <div className='primary-gradient my-4 h-[2px] w-full' />

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

      <MyRooms
        createdRooms={createdRooms}
        joinedRooms={[...(joinedRooms ?? []), ...(joinedRoomsAsAdmin ?? [])]}
      />
    </Layout>
  );
};

export default Homepage;
