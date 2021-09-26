import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Header } from '../../components/global/Header'
import { AiOutlineIdcard } from 'react-icons/ai'
import { RoomNav } from '../../components/room/RoomNav'
import { useFirestore } from '../../context/FirestoreContext'
import { doc, updateDoc } from 'firebase/firestore'
import { Input } from '../../components/Input'

const Invite = () => {
  const [userTag, setUserTag] = useState<string>('')
  const [error, setError] = useState<string>('blank')

  const router = useRouter()
  const { id } = router.query
  const { db, roomList, userList, currentUser } = useFirestore()

  const currentRoom = roomList.find((room) => room.roomID === id)
  const userToInv = userList.find((user) => user.userTag === userTag)

  const inviteUser = async () => {
    const userToInvRef = doc(db, 'userList', userTag || 'none')
    setUserTag('')

    if (userTag === currentUser?.userTag) {
      setError('you are already in the room')
    } else if (userTag === '') {
      setError('example → user:nTWS_')
    } else if (currentRoom?.members.includes(userTag)) {
      setError('user is already in the room')
    } else if (userToInv) {
      await updateDoc(userToInvRef, {
        invites: [currentRoom?.roomID, ...userToInv?.invites],
      })
    } else {
      setError('user tag could not be found')
    }
  }

  return (
    <section className='wrap'>
      <RoomNav room={currentRoom as RoomList} />
      <Header title='Invite a User' desc={currentRoom?.roomID} />
      <form
        spellCheck='false'
        className='w-full flex justify-center items-center flex-col'
      >
        <Input
          handleChange={(e) => setUserTag(e.target.value)}
          value={userTag}
          placeholder='enter user tag'
        />
        <div
          style={{ opacity: error === 'blank' ? '0' : '1' }}
          className='text-center font-bold text-sm mt-2'
        >
          <p>{error}</p>
        </div>
        <div className='inline-block mx-auto mt-2'>
          <button onClick={inviteUser} className='btn btnEffect' type='button'>
            <p className='mr-4'>invite user</p>
            <AiOutlineIdcard className='icon' />
          </button>
        </div>
      </form>
    </section>
  )
}

export default Invite
