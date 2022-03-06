import React, { Fragment } from 'react';
import { RiEye2Fill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { Popover, Transition } from '@headlessui/react';
import { BsFillArrowLeftCircleFill, BsInfoCircleFill } from 'react-icons/bs';

import { useNextQuery } from '@/hooks';
import { MenuBtn } from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';

const RoomMenu = ({ room }: { room: IRoom }) => {
  const tab = useNextQuery('tab');
  const { data } = useAuth();

  return (
    <Popover className='relative z-40 mt-4'>
      {() => (
        <>
          <Popover.Button className='flex w-full items-center justify-end space-x-2'>
            <h4 className='text-sm font-medium'>{room.name}</h4>

            <AiFillSetting className='text-xl text-primary' />
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
            <Popover.Panel className='absolute top-8 right-0 flex flex-col space-y-4 overflow-hidden rounded bg-white p-2 text-sm text-primary shadow-md ring-1 ring-black ring-opacity-5'>
              {tab !== 'info' && (
                <MenuBtn label='room info' tab='info' Icon={BsInfoCircleFill} />
              )}

              {tab !== 'invite' && (
                <MenuBtn label='invite user' tab='invite' Icon={FaUserCircle} />
              )}

              {tab && (
                <MenuBtn
                  tab='room'
                  label='go to room'
                  Icon={BsFillArrowLeftCircleFill}
                />
              )}

              {room.creator === data.userTag && tab !== 'requests' && (
                <MenuBtn
                  label='view requests'
                  tab='requests'
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
