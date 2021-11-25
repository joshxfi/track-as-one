import React, { useState } from 'react';
import { VscSignIn, VscListOrdered } from 'react-icons/vsc';
import { BiDoorOpen } from 'react-icons/bi';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { defaultPic } from '@/utils/default';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { Clipboard, Layout } from '@/components';

const Homepage: React.FC = () => {
  const { push } = useRouter();
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
        <Button
          onClick={() => push('/create')}
          className='home-btn'
          name='create room'
          Icon={BiDoorOpen}
          iconStyles='text-xl text-secondary'
        />
        <Button
          onClick={() => push('/join')}
          className='home-btn'
          name='join room'
          Icon={VscSignIn}
          iconStyles='text-xl text-secondary'
        />
        <Button
          onClick={() => push('/list')}
          className='home-btn'
          name='my rooms'
          Icon={VscListOrdered}
          iconStyles='text-xl text-secondary'
        />
      </div>

      <Clipboard copied={copied} />
    </Layout>
  );
};

export default Homepage;
