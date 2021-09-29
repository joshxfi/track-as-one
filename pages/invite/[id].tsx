import React, { useState } from 'react'
import Container from '../../src/components/Container'
import { useRouter } from 'next/router'
import { Header } from '../../src/components/global/Header'
import { AiOutlineIdcard } from 'react-icons/ai'
import { RoomNav } from '../../src/components/room/RoomNav'
import { useFirestore } from '../../src/context/FirestoreContext'
import { doc, updateDoc } from 'firebase/firestore'
import { Input } from '../../src/components/Input'
import { motion } from 'framer-motion'
import { Error } from '../../src/components/global/Error'

const Invite = () => {
  const [invUserTag, setUserTag] = useState<string>('')
  const [error, setError] = useState<string>('blank')
  const [showError, setShowError] = useState<boolean>(false)

  const errorMsg = (error: string) => {
    setError(error)
    setShowError(true)

    setTimeout(() => {
      setShowError(false)
    }, 3000)
  }

  const router = useRouter()
  const { id } = router.query
  const { db, roomList, userList, currentUser } = useFirestore()

  const currentRoom = roomList.find((room) => room.roomID === id)
  const userToInv = userList.find((user) => user.userTag === invUserTag)

  const inviteUser = async () => {
    const userToInvRef = doc(db, 'userList', invUserTag || 'none')
    setUserTag('')

    if (invUserTag === currentUser?.userTag) {
      errorMsg('you are already in the room')
    } else if (invUserTag === '') {
      errorMsg('example → user:nTWS_')
    } else if (currentRoom?.members?.includes(invUserTag)) {
      errorMsg('user is already in the room')
    } else if (userToInv) {
      await updateDoc(userToInvRef, {
        invites: [currentRoom?.roomID, ...userToInv?.invites],
      })
      errorMsg('user invited!')
    } else {
      errorMsg('user tag could not be found')
    }
  }

  return (
    <Container>
      {currentRoom ? (
        <>
          {' '}
          <RoomNav room={currentRoom as RoomList} />
          <Header title='Invite a User' />
          <form
            spellCheck='false'
            className='w-full flex justify-center items-center flex-col'
          >
            <Input
              handleChange={(e) => setUserTag(e.target.value)}
              value={invUserTag}
              placeholder='enter user tag'
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showError ? 1 : 0 }}
              className='text-center font-bold text-sm mt-2'
            >
              <p>{error}</p>
            </motion.div>
            <div className='inline-block mx-auto mt-2'>
              <button
                onClick={inviteUser}
                className='btn btnEffect'
                type='button'
              >
                <p className='mr-4'>invite user</p>
                <AiOutlineIdcard className='icon' />
              </button>
            </div>
          </form>
        </>
      ) : (
        <Error />
      )}
    </Container>
  )
}

export default Invite
