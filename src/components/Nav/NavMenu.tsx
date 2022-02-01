import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';

import { MenuBtn } from '@/components/Button';
import { AiFillContacts, AiFillHome, AiFillInfoCircle } from 'react-icons/ai';
import { useAuth } from '@/context/AuthContext';

const NavMenu = () => {
  const { user } = useAuth();

  return (
    <Popover className='relative z-50'>
      {() => (
        <>
          <Popover.Button className='md:hidden items-center text-sm py-2 px-4 bg-secondary rounded text-primary shadow-sm hover:shadow-lg hover:bg-secondary/90 transition-opacity font-medium'>
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
            <Popover.Panel className=' bg-white absolute top-14 right-0 flex flex-col space-y-4 text-primary rounded p-2 text-sm overflow-hidden shadow-md ring-1 ring-black ring-opacity-5'>
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
