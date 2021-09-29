import React from 'react'
import Image from 'next/image'
import { Header } from '../../src/components/global/Header'
import { useFirestore } from '../../src/context/FirestoreContext'
import { useRouter } from 'next/router'
import { AiOutlineIdcard } from 'react-icons/ai'
import { defaultPic } from '../../src/static/utils'
import { doc, updateDoc } from 'firebase/firestore'
import mascot from '../../public/assets/404cat.svg'
import Container from '../../src/components/Container'

const Requests = () => {
  const { db, roomList, userList } = useFirestore()
  const router = useRouter()
  const { id } = router.query

  const currentRoom = roomList.find((room) => room.roomID === id)
  const matchUsers = userList.filter((user) =>
    currentRoom?.requests.includes(user.userTag as string)
  )

  const acceptRequest = async ({ userTag, roomsJoined }: UserList) => {
    if (currentRoom) {
      const currentRoomRef = doc(db, 'roomList', currentRoom.roomID)
      const targetUserRef = doc(db, 'userList', userTag as string)

      const newReqs = currentRoom.requests.filter((req) => req !== userTag)

      await updateDoc(currentRoomRef, {
        requests: newReqs,
        members: [userTag, ...currentRoom.members],
      })

      await updateDoc(targetUserRef, {
        roomsJoined: [currentRoom.roomID, ...roomsJoined],
      })
    }
  }

  return (
    <Container>
      <Header title='Invitation' />
      <div className='w-full mb-4'>
        {currentRoom?.requests.length ? (
          matchUsers.map((user) => (
            <button
              onClick={() => acceptRequest(user)}
              key={user.userTag}
              className='flex-between card h-[70px] mb-2 btnEffect w-full text-left'
            >
              <div className='flex'>
                <div className='h-9 w-9 bg-secondary rounded-full mr-4 overflow-hidden'>
                  <Image
                    src={user?.photoURL || defaultPic}
                    height={36}
                    width={36}
                    alt='creator profile picture'
                  />
                </div>
                <div className='leading-5'>
                  <p className='text-f9'>
                    {user?.displayName} →
                    <span className='text-secondary'> {user.userTag}</span>
                  </p>
                  <p className='text-sm'>accept request</p>
                </div>
              </div>
              <AiOutlineIdcard className='icon text-xl' />
            </button>
          ))
        ) : (
          <div className='flex flex-col items-center leading-5'>
            <div className='w-[150px] mt-10'>
              <Image src={mascot} alt='404 cat mascot' />
            </div>
            <h2 className='font-bold text-xl'>why so empty?</h2>
          </div>
        )}
      </div>
    </Container>
  )
}

export default Requests
