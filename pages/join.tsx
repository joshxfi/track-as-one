import React, { useState } from 'react'
import { Header } from '../src/components/global/Header'
import { VscSignIn } from 'react-icons/vsc'
import { Input } from '../src/components/Input'
import { doc, updateDoc } from 'firebase/firestore'
import { useFirestore } from '../src/context/FirestoreContext'
import Container from '../src/components/Container'

const Join = () => {
  const { currentUser, roomList, db } = useFirestore()
  const [roomID, setRoomID] = useState<string>('')
  const targetRoom = roomList.find((room) => room.roomID === roomID)
  const userTag = currentUser?.userTag as string

  const requestJoin = async () => {
    setRoomID('')

    if (
      targetRoom &&
      !targetRoom.members.includes(userTag) &&
      !targetRoom.requests.includes(userTag) &&
      targetRoom.creator !== userTag
    ) {
      const requestRoomRef = doc(db, 'roomList', roomID)

      await updateDoc(requestRoomRef, {
        requests: [currentUser?.userTag, ...targetRoom.requests],
      })
    }
  }

  return (
    <Container>
      <Header title='Join a Room' />
      <div className='w-full flex justify-center items-center flex-col'>
        <Input
          handleChange={(e) => setRoomID(e.target.value)}
          value={roomID}
          placeholder='enter room id'
        />
        <div className='inline-block mx-auto mt-6'>
          <button onClick={requestJoin} className='btn btnEffect'>
            <p className='mr-4'>request join</p>
            <VscSignIn className='icon' />
          </button>
        </div>
      </div>
    </Container>
  )
}

export default Join
