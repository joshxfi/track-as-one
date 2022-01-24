import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill, BsInfoCircleFill } from 'react-icons/bs';

const RoomNav = ({ room }: { room: IRoom }) => {
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();
  const { id } = room;

  const handleRoute = (tab: string) => {
    router.push({ query: { ...router.query, tab } });
  };

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
          <button
            className='room-nav-item'
            type='button'
            onClick={() => handleRoute('info')}
          >
            <BsInfoCircleFill />
            <a>room info</a>
          </button>

          <Link href={`/room/${encodeURIComponent(id ?? '')}`}>
            <div className='room-nav-item'>
              <BsFillArrowLeftCircleFill />
              <p>go to room</p>
            </div>
          </Link>

          <button
            className='room-nav-item'
            type='button'
            onClick={() => handleRoute('invite')}
          >
            <FaUserCircle />
            <a>invite user</a>
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomNav;
