import React, { Fragment } from 'react';
import { RiEye2Fill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsInfoCircleFill } from 'react-icons/bs';
import { Popover, Transition } from '@headlessui/react';

import { Indicator } from '@/components';
import { MenuBtn } from '@/components/Button';
import { useRoomContext } from '@/contexts/RoomContext';

const RoomMenu = () => {
  const { isAdmin, room } = useRoomContext();

  return (
    <Popover className='relative z-40'>
      {() => (
        <>
          <Popover.Button className='room-btn relative'>
            <AiOutlineSetting />
            {room.requests.length > 0 && <Indicator />}
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
            <Popover.Panel className='absolute top-12 right-0 flex w-[180px] flex-col space-y-4 overflow-hidden rounded bg-white p-2 text-sm text-primary shadow-md ring-1 ring-black ring-opacity-5'>
              <MenuBtn label='room info' tab='info' Icon={BsInfoCircleFill} />

              {isAdmin && (
                <>
                  <MenuBtn
                    label='invite user'
                    tab='invite'
                    Icon={FaUserCircle}
                  />

                  <MenuBtn
                    label='view requests'
                    tab='requests'
                    Icon={RiEye2Fill}
                    indicator={room.requests.length > 0}
                  />
                </>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default RoomMenu;
