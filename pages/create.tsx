import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'
import { Header } from '../components/global/Header'
import { BiDoorOpen } from 'react-icons/bi'
import { Button } from '../components/global/Button'
import { useAuth } from '../context/AuthContext'
import { useFirestore } from '../context/FirestoreContext'
import { addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore'

const Create = () => {
  const [roomName, setRoomName] = useState<string>('')
  const router = useRouter()

  const { uid } = useAuth()
  const { roomRef, db, userList } = useFirestore()

  const user = userList.find((user) => user.uid === uid)

  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const roomID = nanoid(5)

    const payload = {
      roomID,
      creator: user?.userTag,
      name: roomName,
      dateAdded: serverTimestamp(),
    }

    setRoomName('')
    const updateUserRef = doc(db, 'userList', `${user?.userTag}`)

    if (roomName) {
      await addDoc(roomRef, payload)

      if (user?.roomsCreated) {
        await updateDoc(updateUserRef, {
          roomsCreated: [payload.roomID, ...user?.roomsCreated],
        })

        router.push(`/rooms/${roomID}`)
      }
    }
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
