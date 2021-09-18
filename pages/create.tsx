import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { Header } from '../components/global/Header'
import { BiDoorOpen } from 'react-icons/bi'
import { Button } from '../components/global/Button'
import { useAuth } from '../context/AuthContext'
import { useFirestore } from '../context/FirestoreContext'
import { addDoc, serverTimestamp } from 'firebase/firestore'

const Create = () => {
  const [roomName, setRoomName] = useState<string>('')

  const { uid } = useAuth()
  const { roomRef } = useFirestore()

  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = {
      roomID: nanoid(9),
      name: roomName,
      creator: uid,
      dateAdded: serverTimestamp(),
    }

    setRoomName('')
    roomName && (await addDoc(roomRef, payload))
  }

  return (
    <section className="wrap">
      <Header title="Create a Room" />
      <form
        onSubmit={createRoom}
        className="w-full flex justify-center flex-col"
      >
        <input
          onChange={(e) => setRoomName(e.target.value)}
          value={roomName}
          className="h-[36px] bg-inputbg rounded-[36px] px-[20px] text-sm outline-none border-2 focus:border-primary"
          type="text"
          placeholder="enter room name"
        />
        <div className="inline-block mx-auto mt-6">
          <Button desc="create room" type="submit" Icon={BiDoorOpen} />
        </div>
      </form>
    </section>
  )
}

export default Create
