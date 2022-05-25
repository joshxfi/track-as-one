import React from 'react';
import { useUserByTag } from '@/services';
import { defaultPic } from '@/utils/constants';
import ImageFill from '../ImageFill';
import Badges from '../Badges';

const CompletedUser = ({ userTag }: { userTag: string }) => {
  const [user] = useUserByTag(userTag);

  return (
    <div>
      <div className='flex items-center space-x-4'>
        <ImageFill
          src={user?.photoURL || defaultPic}
          className='h-10 w-10 rounded-full'
        />
        <div className='relative'>
          <p>{user?.username}</p>
          <Badges roles={user?.roles} />
        </div>
      </div>
      <hr className='my-4' />
    </div>
  );
};

export default CompletedUser;
