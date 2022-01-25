import React from 'react';
import Image from 'next/image';
import { defaultPic } from '@/utils/default';
import { AiFillIdcard, AiOutlineIdcard } from 'react-icons/ai';
import { useUser } from '@/services';

interface InfoSectionProps {
  memberId: string;
  type?: string;
}

const InfoMember = ({ memberId, type }: InfoSectionProps) => {
  const [member] = useUser(memberId);
  const { photoURL, username } = member ?? {};

  return (
    <div className='flex-between card h-[70px] mb-2'>
      <div className='flex'>
        <div className='h-9 w-9 bg-secondary rounded-full mr-4 overflow-hidden'>
          <Image
            src={photoURL ?? defaultPic}
            height={36}
            width={36}
            alt={`${username} profile`}
          />
        </div>
        <div className='leading-5'>
          <p className='text-f9'>{username}</p>
          <p className='text-sm'>{type}</p>
        </div>
      </div>
      {type === 'creator' ? (
        <AiFillIdcard className='icon text-xl' />
      ) : (
        <AiOutlineIdcard className='icon text-xl' />
      )}
    </div>
  );
};

export default InfoMember;
