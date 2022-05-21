import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { HiClipboardCopy, HiEye, HiPencil } from 'react-icons/hi';

import { MenuBtn } from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

const RoomMenu = () => {
  const {
    data: { userTag, invites },
  } = useAuth();

  const copyTag = () => {
    navigator.clipboard.writeText(userTag ?? '');
    toast.success('copied to clipboard');
  };

  return (
    <Popover className='relative z-40'>
      {() => (
        <>
          <Popover.Button className='border-effect w-full justify-center rounded border-primary bg-lighter px-4 py-2 text-sm font-medium md:text-base'>
            My Profile
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
            <Popover.Panel className='absolute top-14 right-0 flex w-[180px] flex-col space-y-4 overflow-hidden rounded bg-white p-2 text-sm text-primary shadow-md ring-1 ring-black ring-opacity-5'>
              <MenuBtn
                label={userTag}
                Icon={HiClipboardCopy}
                onClick={copyTag}
              />
              <MenuBtn label='Edit Profile' Icon={HiPencil} route='invites' />
              <MenuBtn
                label='View Invites'
                Icon={HiEye}
                route='invites'
                indicator={invites.length > 0}
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default RoomMenu;
