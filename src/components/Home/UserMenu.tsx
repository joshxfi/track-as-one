import React, { useState, Fragment } from 'react';
import toast from 'react-hot-toast';
import { Popover, Transition } from '@headlessui/react';
import { HiClipboardCopy, HiEye, HiPencil } from 'react-icons/hi';

import { Modal } from '@/components';
import { db } from '@/config/firebase';
import { MenuBtn } from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { useDoc } from '@/hooks';

const RoomMenu = () => {
  const {
    user,
    data: { userTag, invites },
  } = useAuth();

  const [{ username }] = useDoc<IUser>(doc(db, `users/${user?.uid}`));

  const [editModal, setEditModal] = useState(false);
  const [newUsername, setNewUsername] = useState(username);

  const copyTag = () => {
    navigator.clipboard.writeText(userTag ?? '');
    toast.success('copied to clipboard');
  };

  const handleEditUsername = async () => {
    if (newUsername === username) {
      setEditModal(false);
      return;
    }

    try {
      await updateDoc(doc(db, `users/${user?.uid}`), {
        username: newUsername,
      });
      toast.success('Username updated');
      setEditModal(false);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <>
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
                <MenuBtn
                  label='Edit Username'
                  Icon={HiPencil}
                  onClick={() => setEditModal(true)}
                />
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
      <Modal
        isOpen={editModal}
        setIsOpen={setEditModal}
        onDismiss={() => setNewUsername(username)}
        title='Edit Username'
        body={
          <div className='room-input-container mt-4'>
            <input
              className='room-input'
              type='text'
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
        }
        proceed={{ text: 'Save', action: handleEditUsername }}
      />
    </>
  );
};

export default RoomMenu;
