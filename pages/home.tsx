import React, { useState } from 'react';
import { VscSignIn, VscListOrdered } from 'react-icons/vsc';
import { AiOutlineIdcard } from 'react-icons/ai';
import { BiDoorOpen } from 'react-icons/bi';
import Image from 'next/image';

import { defaultPic } from '@/utils/default';
import { HomeBtn } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { Clipboard, Layout } from '@/components';

const Homepage: React.FC = () => {
  const { data } = useAuth();
  const { userTag, photoURL, username } = data;
  const [copied, setCopied] = useState<boolean>(false);

  const copyTag = () => {
    navigator.clipboard.writeText(userTag);
    setCopied(true);

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Layout>
      <div className='flex-between mt-8 w-full'>
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

        <div className='text-right'>
          <h1 className='text-2xl font-bold'>{username}</h1>
          <p>{userTag}</p>
        </div>
      </div>

      <div className='bg-gradient-to-tr from-secondary to-[#FFDC54] h-[2px] my-8 w-full' />

      <div className='md:grid grid-cols-2 gap-x-2'>
        <HomeBtn href='/create' name='create room' Icon={BiDoorOpen} />
        <HomeBtn href='/join' name='join room' Icon={VscSignIn} />
        <HomeBtn href='/list' name='my rooms' Icon={VscListOrdered} />
      </div>

      <Clipboard copied={copied} />
    </Layout>
  );
};

export default Homepage;
