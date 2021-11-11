import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { BiDoorOpen } from 'react-icons/bi'
import { updateDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'

import { db } from '@/config/firebase'
import { HrefBtn } from '@/components/Button'
import { useAuth } from '@/context/AuthContext'
import { Header, ErrorMsg, Input, Container } from '@/components'

const Create = () => {
  const [error, setError] = useState<string>('blank')
  const [roomName, setRoomName] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)

  const router = useRouter()

  const { data, user } = useAuth()
  const { userTag, roomsCreated } = data

  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const roomID = nanoid(5)

    const payload: RoomList = {
      name: roomName,
      creator: userTag,
      admin: [],
      members: [],
      dateAdded: serverTimestamp(),
      requests: [],
    }

    setRoomName('')
    if (roomsCreated!.length >= 3) {
      setError('Max rooms reached (3)')
      setShowError(true)

      setTimeout(() => {
        setShowError(false)
      }, 3000)
    } else if (roomName) {
      await setDoc(doc(db, 'rooms', roomID), payload)

      router.push(`/list`)

      await updateDoc(doc(db, 'users', user?.uid!), {
        roomsCreated: [roomID, ...roomsCreated!],
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
        <ErrorMsg error={error} showError={showError} />

        <div className='inline-block mx-auto mt-2'>
          <HrefBtn desc='Create room' type='submit' Icon={BiDoorOpen} />
        </div>
      </form>
    </Container>
  )
}

export default Create
