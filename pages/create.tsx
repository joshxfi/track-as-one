import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'
import { updateDoc, doc, setDoc } from 'firebase/firestore'
import { BiDoorOpen } from 'react-icons/bi'

import { useFirestore } from '@/context/FirestoreContext'
import { Header } from '@/components/Global/Header'
import { HrefBtn } from '@/components/Button'
import { Input } from '@/components/Input'
import Container from '@/components/Container'
import ErrorMSG from '@/components/Global/ErrorMSG'

const Create = () => {
  const [roomName, setRoomName] = useState<string>('')
  const [error, setError] = useState<string>('blank')
  const [showError, setShowError] = useState<boolean>(false)

  const router = useRouter()

  const { db, currentUser } = useFirestore()
  const { userTag, roomsCreated } = currentUser ?? {}

  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const roomID = nanoid(5)

    const payload: RoomList = {
      roomID,
      name: roomName,
      creator: userTag,
      admin: [],
      members: [],
      dateAdded: new Date().toDateString(),
      requests: [],
    }

    setRoomName('')
    const updateUserRef = doc(db, 'userList', `${userTag}`)
    if (roomsCreated!.length >= 3) {
      setError('Max rooms reached (3)')
      setShowError(true)

      setTimeout(() => {
        setShowError(false)
      }, 3000)
    } else if (roomName) {
      const roomDocRef = doc(db, 'roomList', roomID)
      await setDoc(roomDocRef, payload)

      router.push(`/list`)

      await updateDoc(updateUserRef, {
        roomsCreated: [payload.roomID, ...roomsCreated!],
      })
    }
  }

  return (
    <Container>
      <Header title='Create a Room' />
      <form
        onSubmit={createRoom}
        className='w-full flex justify-center flex-col items-center'
      >
        <Input
          handleChange={(e) => setRoomName(e.target.value)}
          value={roomName}
          placeholder='enter room name'
          max={15}
        />
        <ErrorMSG error={error} showError={showError} />

        <div className='inline-block mx-auto mt-2'>
          <HrefBtn desc='Create room' type='submit' Icon={BiDoorOpen} />
        </div>
      </form>
    </Container>
  )
}

export default Create
