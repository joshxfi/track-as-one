import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BsCalendarFill } from 'react-icons/bs'
import { AiOutlineIdcard } from 'react-icons/ai'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'

import { RoomNav } from '@/components/Room'
import { InfoBtn } from '@/components/Button'
import { Container, Header, Clipboard, Error } from '@/components'

const Info: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false)

  const router = useRouter()
  const { id } = router.query
  const currentRoom = roomList.find((room) => room.roomID === id)
  const { creator, dateAdded, members, requests, roomID } = currentRoom ?? {}

  const roomCreator = userList.find((user) => user.userTag === creator)
  const { userTag, roomsCreated, displayName, photoURL } = roomCreator ?? {}

  const roomMembers = userList.filter((user) =>
    members?.includes(user?.userTag as string)
  )

  const deleteRoom = async () => {
    const delRoomRef = doc(db, 'roomList', `${roomID}`)
    const creatorRef = doc(db, 'userList', `${userTag}`)

    router.push('/')
    await deleteDoc(delRoomRef)

    const filterRoom = roomsCreated?.filter((room) => room !== roomID)

    await updateDoc(creatorRef, {
      roomsCreated: filterRoom,
    })
  }

  const leaveRoom = async () => {
    const removeMemberRef = doc(db, 'roomList', `${roomID}`)
    const updateUserRef = doc(db, 'userList', `${currentUser?.userTag}`)

    const updatedRoomMembers = members?.filter(
      (member) => member !== currentUser?.userTag
    )
    const updatedUserRooms = currentUser?.roomsJoined.filter(
      (room) => room !== id
    )

    if (currentUser?.userTag !== creator) {
      await updateDoc(removeMemberRef, {
        members: updatedRoomMembers,
      })

      router.push('/')

      await updateDoc(updateUserRef, {
        roomsJoined: updatedUserRooms,
      })
    }
  }

  const copyRoomID = () => {
    navigator.clipboard.writeText(`${roomID}`)
    setCopied(true)

    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <Container>
      {currentRoom ? (
        <>
          <RoomNav room={currentRoom} />
          <Header title='Room Info' desc={`room id → ${roomID}`} />

          <div className='card flex-between h-[70px] mb-2 w-full'>
            <div className='leading-5'>
              <p className='text-f9 text-sm'>{dateAdded}</p>
              <p className='text-sm'>room created</p>
            </div>

            <BsCalendarFill className='icon' />
          </div>

          <div className='w-full mb-4'>
            <div className='flex-between card h-[70px] mb-2'>
              <div className='flex'>
                <div className='h-9 w-9 bg-secondary rounded-full mr-4 overflow-hidden'>
                  <Image
                    src={photoURL || defaultPic}
                    height={36}
                    width={36}
                    alt='creator profile picture'
                  />
                </div>
                <div className='leading-5'>
                  <p className='text-f9'>{displayName}</p>
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

            {creator === currentUser?.userTag ? (
              <>
                <div className='flex'>
                  <InfoBtn
                    desc='DELETE ROOM'
                    styles='mr-2'
                    handleClick={deleteRoom}
                  />
                  <InfoBtn
                    desc='GO BACK'
                    handleClick={() => router.push(`/rooms/${roomID}`)}
                  />
                </div>
                <InfoBtn
                  styles='mt-2'
                  desc={`VIEW REQUESTS (${requests?.length})`}
                  handleClick={() => router.push(`/requests/${roomID}`)}
                />
              </>
            ) : (
              <>
                <div className='flex'>
                  <InfoBtn
                    desc='LEAVE ROOM'
                    styles='mr-2'
                    handleClick={leaveRoom}
                  />
                  <InfoBtn
                    desc='GO BACK'
                    handleClick={() => router.push(`/rooms/${roomID}`)}
                  />
                </div>
              </>
            )}
            <InfoBtn
              desc='COPY ROOM ID'
              styles='mt-2'
              handleClick={copyRoomID}
            />

            <div className='text-center'>
              <Clipboard copied={copied} />
            </div>
          </div>
        </>
      ) : (
        <Error />
      )}
    </Container>
  )
}

export default Info
