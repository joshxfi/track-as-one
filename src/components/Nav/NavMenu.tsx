import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';

import { MenuBtn } from '@/components/Button';
import { AiFillContacts, AiFillHome, AiFillInfoCircle } from 'react-icons/ai';
import { useAuth } from '@/contexts/AuthContext';

const NavMenu = () => {
  const { user } = useAuth();

  return (
    <Popover className='relative z-50'>
      {() => (
        <>
          <Popover.Button className='items-center rounded bg-secondary py-2 px-4 text-sm font-medium text-primary shadow-sm transition-opacity hover:bg-secondary/90 hover:shadow-lg md:hidden'>
            Menu
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
            <Popover.Panel className=' absolute top-14 right-0 flex flex-col space-y-4 overflow-hidden rounded bg-white p-2 text-sm text-primary shadow-md ring-1 ring-black ring-opacity-5'>
              <MenuBtn
                label='home'
                route={user ? 'home' : ''}
                Icon={AiFillHome}
              />
              <MenuBtn label='about' route='about' Icon={AiFillInfoCircle} />
              <MenuBtn label='contact' route='contact' Icon={AiFillContacts} />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default NavMenu;
