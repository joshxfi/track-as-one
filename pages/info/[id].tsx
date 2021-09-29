import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineIdcard } from 'react-icons/ai'
import { BsCalendarFill } from 'react-icons/bs'
import { Header } from '../../src/components/global/Header'
import { RoomNav } from '../../src/components/room/RoomNav'
import { useFirestore } from '../../src/context/FirestoreContext'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { InfoBtn } from '../../src/components/buttons/InfoBtn'
import { defaultPic } from '../../src/static/utils'
import { Error } from '../../src/components/global/Error'

const Info: React.FC = () => {
  const { db, roomList, userList, currentUser } = useFirestore()

  const router = useRouter()
  const { id } = router.query
  const currentRoom = roomList.find((room) => room.roomID === id)
  const roomCreator = userList.find(
    (user) => user.userTag === currentRoom?.creator
  )
  const roomMembers = userList.filter((user) =>
    currentRoom?.members.includes(user?.userTag as string)
  )
  const dateCreated = currentRoom?.dateAdded.toDate().toDateString()

  const deleteRoom = async () => {
    const delRoomRef = doc(db, 'roomList', `${currentRoom?.roomID}`)
    const creatorRef = doc(db, 'userList', `${roomCreator?.userTag}`)

    router.push('/')
    await deleteDoc(delRoomRef)

    const filterRoom = roomCreator?.roomsCreated.filter(
      (room) => room !== currentRoom?.roomID
    )

    await updateDoc(creatorRef, {
      roomsCreated: filterRoom,
    })
  }

  const leaveRoom = async () => {
    const removeMemberRef = doc(db, 'roomList', `${currentRoom?.roomID}`)
    const updateUserRef = doc(db, 'userList', `${currentUser?.userTag}`)

    const updatedRoomMembers = currentRoom?.members.filter(
      (member) => member !== currentUser?.userTag
    )
    const updatedUserRooms = currentUser?.roomsJoined.filter(
      (room) => room !== id
    )

    if (currentUser?.userTag !== currentRoom?.creator) {
      await updateDoc(removeMemberRef, {
        members: updatedRoomMembers,
      })

      router.push('/')

      await updateDoc(updateUserRef, {
        roomsJoined: updatedUserRooms,
      })
    }
  }

  return (
    <section className='wrap'>
      {currentRoom ? (
        <>
          <RoomNav room={currentRoom as RoomList} />
          <Header title='Room Info' desc={`room id → ${currentRoom?.roomID}`} />

          <div className='card flex-between h-[70px] mb-2 w-full'>
            <div className='leading-5'>
              <p className='text-f9 text-sm'>{dateCreated}</p>
              <p className='text-sm'>room created</p>
            </div>

            <BsCalendarFill className='icon' />
          </div>

          <div className='w-full mb-4'>
            <div className='flex-between card h-[70px] mb-2'>
              <div className='flex'>
                <div className='h-9 w-9 bg-secondary rounded-full mr-4 overflow-hidden'>
                  <Image
                    src={
                      roomCreator?.photoURL ? roomCreator?.photoURL : defaultPic
                    }
                    height={36}
                    width={36}
                    alt='creator profile picture'
                  />
                </div>
                <div className='leading-5'>
                  <p className='text-f9'>{roomCreator?.displayName}</p>
                  <p className='text-sm'>creator</p>
                </div>
              </div>
              <AiOutlineIdcard className='icon text-xl' />
            </div>

            {roomMembers.map((member) => (
              <div
                key={member.userTag}
                className='flex-between card h-[70px] mb-2'
              >
                <div className='flex'>
                  <div className='h-9 w-9 bg-secondary rounded-full mr-4 overflow-hidden'>
                    <Image
                      src={member?.photoURL ? member?.photoURL : defaultPic}
                      height={36}
                      width={36}
                      alt='creator profile picture'
                    />
                  </div>
                  <div className='leading-5'>
                    <p className='text-f9'>{member?.displayName}</p>
                    <p className='text-sm'>member</p>
                  </div>
                </div>
                <AiOutlineIdcard className='icon text-xl' />
              </div>
            ))}

            {currentRoom?.creator === currentUser?.userTag ? (
              <div className='flex'>
                <InfoBtn desc='DELETE ROOM' handleClick={deleteRoom} />
                <InfoBtn
                  desc={`VIEW REQUESTS (${currentRoom?.requests.length})`}
                  handleClick={() =>
                    router.push(`/requests/${currentRoom?.roomID}`)
                  }
                />
              </div>
            ) : (
              <InfoBtn desc='LEAVE ROOM' handleClick={leaveRoom} />
            )}
          </div>
        </>
      ) : (
        <Error />
      )}
    </section>
  )
}

export default Info
