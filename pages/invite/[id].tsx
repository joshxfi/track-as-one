import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Header } from '../../components/global/Header'
import { AiOutlineIdcard } from 'react-icons/ai'
import { RoomNav } from '../../components/room/RoomNav'
import { useFirestore } from '../../context/FirestoreContext'
import { doc, updateDoc } from 'firebase/firestore'

const Invite = () => {
  const [userTag, setUserTag] = useState<string>('')

  const router = useRouter()
  const { id } = router.query
  const { db, roomList, userList } = useFirestore()

  const currentRoom = roomList.find((room) => room.roomID === id)
  const userToInv = userList.find((user) => user.userTag === userTag)

  const inviteUser = async () => {
    const userToInvRef = doc(db, 'userList', userTag)
    setUserTag('')

    if (userToInv) {
      await updateDoc(userToInvRef, {
        invites: [currentRoom?.roomID, ...userToInv?.invites],
      })
    }
  }

  return (
    <section className="wrap">
      <RoomNav room={currentRoom as RoomList} />
      <Header title="Invite a User" desc={currentRoom?.roomID} />
      <form spellCheck="false" className="w-full flex justify-center flex-col">
        <input
          className="h-[36px] bg-inputbg rounded-[36px] px-[20px] text-sm outline-none border-2 focus:border-primary"
          type="text"
          placeholder="enter user tag"
          onChange={(e) => setUserTag(e.target.value)}
          value={userTag}
        />
        <div className="inline-block mx-auto mt-6">
          <button onClick={inviteUser} className="btn btnEffect" type="button">
            <p className="mr-4">invite user</p>
            <AiOutlineIdcard className="icon" />
          </button>
        </div>
      </form>
    </section>
  )
}

export default Invite
