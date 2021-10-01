import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'
import { Header } from '../src/components/global/Header'
import { BiDoorOpen } from 'react-icons/bi'
import { Button } from '../src/components/buttons/Button'
import { useFirestore } from '../src/context/FirestoreContext'
import { serverTimestamp, updateDoc, doc, setDoc } from 'firebase/firestore'
import { Input } from '../src/components/Input'
import Container from '../src/components/Container'
import ErrorMSG from '../src/components/global/ErrorMSG'

const Create = () => {
  const [roomName, setRoomName] = useState<string>('')
  const [error, setError] = useState<string>('blank')
  const [showError, setShowError] = useState<boolean>(false)

  const router = useRouter()

  const { db, currentUser } = useFirestore()

  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const roomID = nanoid(5)

    const payload: RoomList = {
      roomID,
      name: roomName,
      tasks: [],
      creator: currentUser?.userTag,
      admin: [],
      members: [],
      dateAdded: serverTimestamp(),
      requests: [],
    }

    setRoomName('')
    const updateUserRef = doc(db, 'userList', `${currentUser?.userTag}`)
    if (currentUser!.roomsCreated.length >= 3) {
      setError('Max rooms reached (3)')
      setShowError(true)

      setTimeout(() => {
        setShowError(false)
      }, 3000)
    } else if (roomName) {
      const roomDocRef = doc(db, 'roomList', roomID)
      await setDoc(roomDocRef, payload)

      if (currentUser?.roomsCreated) {
        router.push(`/list`)

        await updateDoc(updateUserRef, {
          roomsCreated: [payload.roomID, ...currentUser?.roomsCreated],
        })
      }
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
          <Button desc='Create room' type='submit' Icon={BiDoorOpen} />
        </div>
      </form>
    </Container>
  )
}

export default Create
