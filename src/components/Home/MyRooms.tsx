import React from 'react';
import { ListRooms, NoRooms, RoomLabel } from '@/components/Home';
import {
  BsFillArrowRightCircleFill,
  BsFillPlusCircleFill,
} from 'react-icons/bs';

interface MyRoomsProps {
  createdRooms?: IRoom[];
  joinedRooms?: IRoom[];
}

const MyRooms = ({ createdRooms, joinedRooms }: MyRoomsProps) => {
  return (
    <div className='mx-auto w-full max-w-screen-sm space-y-16'>
      <section>
        <RoomLabel
          label='Create'
          text={`${createdRooms?.length} out of 5 rooms`}
          Icon={BsFillPlusCircleFill}
        />

        {createdRooms?.length ? (
          <div className='space-y-2'>
            {createdRooms?.map((room) => (
              <ListRooms key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <NoRooms desc='Create a Room' href='/create' />
        )}
      </section>

      <section>
        <RoomLabel
          label='Join'
          text={`${joinedRooms?.length} out of ∞ rooms`}
          Icon={BsFillArrowRightCircleFill}
        />

        {joinedRooms?.length ? (
          <div className='space-y-2'>
            {joinedRooms?.map((room) => (
              <ListRooms key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <NoRooms desc='Join a Room' href='/join' />
        )}
      </section>
    </div>
  );
};

export default MyRooms;
