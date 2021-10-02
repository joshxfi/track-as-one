import React, { useState } from 'react'
import Container from '../src/components/Container'
import ErrorMSG from '../src/components/Global/ErrorMSG'
import { Header } from '../src/components/Global/Header'
import { VscSignIn } from 'react-icons/vsc'
import { Input } from '../src/components/Input'
import { doc, updateDoc } from 'firebase/firestore'
import { useFirestore } from '../src/context/FirestoreContext'

const Join = () => {
  const { currentUser, roomList, db } = useFirestore()
  const { userTag } = currentUser || {}
  const [roomID, setRoomID] = useState<string>('')
  const [error, setError] = useState<string>('blank')
  const [showError, setShowError] = useState<boolean>(false)

  const errorMsg = (error: string) => {
    setError(error)
    setShowError(true)

    setTimeout(() => {
      setShowError(false)
    }, 3000)
  }

  const targetRoom = roomList.find((room) => room.roomID === roomID)
  const { members, creator, requests } = targetRoom || {}

  const requestJoin = async () => {
    setRoomID('')

    if (members?.includes(userTag!)) errorMsg('You are already a member')
    else if (members?.includes(userTag!)) errorMsg('You already sent a request')
    else if (creator === userTag) errorMsg('You are the owner of the room')
    else if (!targetRoom) errorMsg('Room does not exist')
    else {
      const requestRoomRef = doc(db, 'roomList', roomID)

      await updateDoc(requestRoomRef, {
        requests: [currentUser?.userTag, ...(requests ?? [])],
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
          max={15}
        />
        <ErrorMSG error={error} showError={showError} />

        <div className='inline-block mx-auto mt-2'>
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
