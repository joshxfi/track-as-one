import React from 'react'
import { Header } from '../src/components/global/Header'
import { BiDoorOpen } from 'react-icons/bi'
import { VscSignIn } from 'react-icons/vsc'
import { BsEye } from 'react-icons/bs'
import { Button } from '../src/components/buttons/Button'
import { useFirestore } from '../src/context/FirestoreContext'
import { useRouter } from 'next/router'
import Container from '../src/components/Container'

const List = () => {
  const { currentUser, roomList } = useFirestore()

  const createdRooms = roomList.filter((room) =>
    currentUser?.roomsCreated.includes(room.roomID)
  )
  const joinedRooms = roomList.filter((room) =>
    currentUser?.roomsJoined.includes(room.roomID)
  )

  return (
    <Container>
      <Header title='My Rooms' />
      <div className='w-full mb-4'>
        <div className='w-full bg-secondary text-primary text-center mb-2 rounded-lg py-1 text-sm'>
          <h2>rooms created {createdRooms.length}/3</h2>
        </div>

        {createdRooms.length ? (
          createdRooms.map((room) => (
            <ListRooms key={room.roomID} room={room} />
          ))
        ) : (
          <NoRooms desc='Create a Room' href='/create' />
        )}

        <div className='w-full bg-secondary text-primary text-center my-2 rounded-lg py-1 text-sm'>
          <h2>rooms joined {joinedRooms.length}/∞</h2>
        </div>

        {joinedRooms.length ? (
          joinedRooms.map((room) => <ListRooms key={room.roomID} room={room} />)
        ) : (
          <NoRooms desc='Join a Room' href='/join' />
        )}
      </div>

      <Button desc='view invites' href='/invites' Icon={BsEye} />
    </Container>
  )
}

export default List

const ListRooms: React.FC<ListRoomsProps> = ({ room }) => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(`/rooms/${room.roomID}`)}
      className="card flex-between h-[70px] mb-2 btnEffect w-full text-left"
    >
      <div className="leading-5">
        <p className="text-f9">{room.name}</p>
        <p className="text-sm">members: {room.members.length}</p>
      </div>

      <BiDoorOpen className="icon" />
    </button>
  )
}

const NoRooms: React.FC<NoRoomsProps> = ({ desc, href }) => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(href)}
      className="flex px-[30px] justify-between h-[70px] w-full items-center bg-primary text-f9 text-center rounded-lg btnEffect"
    >
      <h2>{desc}</h2>
      <VscSignIn className="icon" />
    </button>
  )
}
