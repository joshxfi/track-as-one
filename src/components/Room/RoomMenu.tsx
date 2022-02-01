import React, { Fragment } from 'react';
import { RiEye2Fill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { Popover, Transition } from '@headlessui/react';
import { BsFillArrowLeftCircleFill, BsInfoCircleFill } from 'react-icons/bs';

import { useNextQuery } from '@/hooks';
import { useAuth } from '@/context/AuthContext';
import { SettingBtn } from '@/components/Button';

const RoomMenu = ({ room }: { room: IRoom }) => {
  const tab = useNextQuery('tab');
  const { data } = useAuth();

  return (
    <Popover className='relative mt-4 z-50'>
      {() => (
        <>
          <Popover.Button className='flex w-full justify-end space-x-4 items-center'>
            <h4 className='text-sm font-medium'>{room.name}</h4>

            <button type='button' className='text-xl text-primary'>
              <AiFillSetting />
            </button>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='bg-white absolute top-8 right-0 flex flex-col space-y-4 text-primary rounded p-2 text-sm overflow-hidden shadow-md ring-1 ring-black ring-opacity-5'>
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
                <SettingBtn
                  label='got to room'
                  Icon={BsFillArrowLeftCircleFill}
                />
              )}

              {room.creator === data.id && tab !== 'requests' && (
                <SettingBtn
                  label='view requests'
                  route='requests'
                  Icon={RiEye2Fill}
                />
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default RoomMenu;
