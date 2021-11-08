import React from 'react'
import { BsEye } from 'react-icons/bs'

import { Container, Header } from '@/components'
import { HrefBtn } from '@/components/Button'
import { ListRooms, NoRooms } from '@/components/Room'

const List = () => {
  const createdRooms = roomList?.filter((room) =>
    currentUser?.roomsCreated?.includes(room.roomID)
  )
  const joinedRooms = roomList?.filter((room) =>
    currentUser?.roomsJoined.includes(room.roomID)
  )

  return (
    <Container>
      <Header title='My Rooms' />
      <div className='w-full mb-4'>
        <div className='w-full bg-secondary text-primary text-center mb-2 rounded-lg py-1 text-sm'>
          <h2>rooms created {createdRooms?.length}/3</h2>
        </div>

        {createdRooms?.length ? (
          createdRooms?.map((room) => (
            <ListRooms key={room.roomID} room={room} />
          ))
        ) : (
          <NoRooms desc='Create a Room' href='/create' />
        )}

        <div className='w-full bg-secondary text-primary text-center my-2 rounded-lg py-1 text-sm'>
          <h2>rooms joined {joinedRooms?.length}/∞</h2>
        </div>

        {joinedRooms?.length ? (
          joinedRooms?.map((room) => (
            <ListRooms key={room.roomID} room={room} />
          ))
        ) : (
          <NoRooms desc='Join a Room' href='/join' />
        )}
      </div>

      <HrefBtn desc='view invites' href='/invites' Icon={BsEye} />
    </Container>
  )
}

export default List
