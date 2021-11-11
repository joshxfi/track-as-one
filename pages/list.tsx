import React from 'react'
import { BsEye } from 'react-icons/bs'

import { Container, Header, Loader } from '@/components'
import { HrefBtn } from '@/components/Button'
import { ListRooms, NoRooms } from '@/components/Room'
import { useCollection } from '@/hooks'
import { collection, query, where } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { useAuth } from '@/context/AuthContext'

const List = () => {
  const { data } = useAuth()

  const roomRef = collection(db, 'rooms')

  const [createdRooms, loading] = useCollection<RoomList>(
    query(roomRef, where('creator', '==', data.userTag ?? ''))
  )
  const [joinedRooms, _loading] = useCollection<RoomList>(
    query(roomRef, where('members', 'array-contains', data.userTag ?? ''))
  )

  const isLoading = loading || _loading

  if (isLoading) return <Loader />

  return (
    <Container>
      <Header title='My Rooms' />
      <div className='w-full mb-4'>
        <div className='w-full bg-secondary text-primary text-center mb-2 rounded-lg py-1 text-sm'>
          <h2>rooms created {createdRooms?.length}/3</h2>
        </div>

        {createdRooms?.length ? (
          createdRooms?.map((room) => <ListRooms key={room.id} room={room} />)
        ) : (
          <NoRooms desc='Create a Room' href='/create' />
        )}

        <div className='w-full bg-secondary text-primary text-center my-2 rounded-lg py-1 text-sm'>
          <h2>rooms joined {joinedRooms?.length}/∞</h2>
        </div>

        {joinedRooms?.length ? (
          joinedRooms?.map((room) => <ListRooms key={room.id} room={room} />)
        ) : (
          <NoRooms desc='Join a Room' href='/join' />
        )}
      </div>

      <HrefBtn desc='view invites' href='/invites' Icon={BsEye} />
    </Container>
  )
}

export default List
