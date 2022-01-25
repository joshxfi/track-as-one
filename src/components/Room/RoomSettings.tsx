import React, { useState } from 'react';
import { RiEye2Fill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill, BsInfoCircleFill } from 'react-icons/bs';

import { useNextQuery } from '@/hooks';
import { useAuth } from '@/context/AuthContext';
import { SettingBtn } from '@/components/Button';

const RoomNav = ({ room }: { room: IRoom }) => {
  const [showSettings, setShowSettings] = useState(false);
  const tab = useNextQuery('tab');
  const { data } = useAuth();

  return (
    <div className='relative mt-4 z-50'>
      <div className='flex justify-end space-x-4 items-center'>
        <h4 className='text-sm font-medium'>{room.name}</h4>

        <button
          type='button'
          onClick={() => setShowSettings(!showSettings)}
          className='text-xl text-primary'
        >
          <AiFillSetting />
        </button>
      </div>

      {showSettings && (
        <div
          onMouseLeave={() => setShowSettings(false)}
          className='bg-white absolute top-8 right-0 flex flex-col space-y-4 text-primary rounded p-2 text-sm overflow-hidden shadow-md ring-1 ring-black ring-opacity-5'
        >
          {tab !== 'info' && (
            <SettingBtn
              label='room info'
              route='info'
              Icon={BsInfoCircleFill}
            />
          )}

          {tab !== 'invite' && (
            <SettingBtn
              label='invite user'
              route='invite'
              Icon={FaUserCircle}
            />
          )}

          {tab && (
            <SettingBtn label='got to room' Icon={BsFillArrowLeftCircleFill} />
          )}

          {room.creator === data.id && tab !== 'requests' && (
            <SettingBtn
              label='view requests'
              route='requests'
              Icon={RiEye2Fill}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RoomNav;
