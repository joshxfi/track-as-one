import React from 'react';
import Image from 'next/image';
import { AiFillIdcard, AiOutlineIdcard } from 'react-icons/ai';

interface InfoSectionProps {
  img: string;
  label?: string;
  username: string;
}

const InfoMember = ({ img, label = 'member', username }: InfoSectionProps) => {
  return (
    <div className='flex-between card h-[70px] mb-2'>
      <div className='flex'>
        <div className='h-9 w-9 bg-secondary rounded-full mr-4 overflow-hidden'>
          <Image src={img} height={36} width={36} alt={`${username} profile`} />
        </div>
        <div className='leading-5'>
          <p className='text-f9'>{username}</p>
          <p className='text-sm'>{label}</p>
        </div>
      </div>
      {label === 'creator' ? (
        <AiFillIdcard className='icon text-xl' />
      ) : (
        <AiOutlineIdcard className='icon text-xl' />
      )}
    </div>
  );
};

export default InfoMember;
