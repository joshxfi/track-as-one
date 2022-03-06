import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaIdCardAlt } from 'react-icons/fa';
import { AiFillIdcard, AiOutlineIdcard } from 'react-icons/ai';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useNextQuery } from '@/hooks';
import { useUserByTag } from '@/services';
import { Modal, ImageFill } from '@/components';

interface InfoSectionProps {
  memberId: string;
  type?: 'creator' | 'admin' | 'member';
}

const InfoMember = ({ memberId, type }: InfoSectionProps) => {
  const id = useNextQuery('id');
  const [member] = useUserByTag(memberId);
  const [userModal, setUserModal] = useState(false);
  const [kickMemberModal, setKickMemberModal] = useState(false);
  const { username, photoURL } = member;

  const roomRef = doc(db, `rooms/${id}`);
  const isAdmin = type === 'admin';

  const Icon = () => {
    switch (type) {
      case 'creator':
        return <FaIdCardAlt />;

      case 'admin':
        return <AiFillIdcard />;

      default:
        return <AiOutlineIdcard />;
    }
  };

  const handleAdmin = () => {
    setUserModal(false);

    setTimeout(async () => {
      await updateDoc(roomRef, {
        admin: isAdmin ? arrayRemove(memberId) : arrayUnion(memberId),
      });

      await updateDoc(roomRef, {
        members: isAdmin ? arrayUnion(memberId) : arrayRemove(memberId),
      });

      toast.success(`${username} is ${isAdmin ? 'no longer' : 'now'} an admin`);
    }, 500);
  };

  const kickMember = async () => {
    if (type === 'admin') {
      await updateDoc(roomRef, {
        admin: arrayRemove(memberId),
      });
    } else {
      await updateDoc(roomRef, {
        members: arrayRemove(memberId),
      });
    }

    toast.success(`${username} has been kicked`);
  };

  return (
    <button
      type='button'
      onClick={() => {
        setUserModal(true);
      }}
      className='flex-between card mb-2 h-[70px] w-full cursor-pointer text-left transition-opacity hover:bg-opacity-95'
    >
      <Modal
        title='Remove Member'
        description={`Are you sure you want to kick ${username}? They can still join back if they send a request or are invited.`}
        setIsOpen={setKickMemberModal}
        isOpen={kickMemberModal}
        buttons={
          <button
            type='button'
            onClick={kickMember}
            className='modal-btn bg-red-500'
          >
            Kick
          </button>
        }
      />

      <Modal
        isOpen={userModal}
        setIsOpen={setUserModal}
        title='Manage User'
        containerStyle='w-auto p-8'
        body={
          <>
            <hr className='my-4' />
            <div className='flex items-center justify-center space-x-4'>
              <ImageFill
                src={photoURL ?? ''}
                className='h-16 w-16 rounded-full bg-secondary'
                alt={`${username} profile`}
              />
              <div>
                <p className='font-medium'>{username}</p>
                <p className='text-sm'>{memberId}</p>
              </div>
            </div>
          </>
        }
        buttons={
          <div className='flex transform justify-center space-x-2 pt-4'>
            {type !== 'creator' && (
              <>
                <button
                  type='button'
                  onClick={() => {
                    setUserModal(false);

                    setTimeout(() => {
                      setKickMemberModal(true);
                    }, 500);
                  }}
                  className='modal-btn bg-red-500'
                >
                  Kick
                </button>
                <button
                  type='button'
                  onClick={handleAdmin}
                  className='modal-btn bg-blue-500'
                >
                  {isAdmin ? 'Remove Admin' : 'Make Admin'}
                </button>
              </>
            )}
          </div>
        }
      />
      <div className='flex'>
        <ImageFill
          className='mr-4 h-9 w-9 rounded-full bg-secondary'
          src={photoURL ?? ''}
          alt={`${username} profile`}
        />
        <div className='leading-5'>
          <p className='text-f9'>{username}</p>
          <p className='text-sm'>{type}</p>
        </div>
      </div>
      <div className='icon text-xl'>{Icon()}</div>
    </button>
  );
};

export default InfoMember;
