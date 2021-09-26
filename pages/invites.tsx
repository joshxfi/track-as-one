import React from 'react'
import { Header } from '../components/global/Header'
import { BiDoorOpen } from 'react-icons/bi'
import { useFirestore } from '../context/FirestoreContext'
import Image from 'next/image'
import mascot from '../public/assets/404cat.svg'
import { doc, updateDoc } from 'firebase/firestore'
import router from 'next/router'

const Invites: React.FC = () => {
  const { db, currentUser, roomList } = useFirestore()

  const userInvites = currentUser?.invites.map((inv) => inv)
  const matchInvites = roomList.filter((room) =>
    userInvites?.includes(room.roomID)
  )

  const acceptInvite = async (roomTag: string) => {
    const targetRoom = roomList.find((room) => room.roomID === roomTag)

    const currentUserRef = doc(db, 'userList', `${currentUser?.userTag}`)
    const joinRoomRef = doc(db, 'roomList', roomTag)

    if (currentUser) {
      await updateDoc(currentUserRef, {
        invites: currentUser?.invites.filter((invite) => invite !== roomTag),
        roomsJoined: [roomTag, ...currentUser?.roomsJoined],
      })

      await updateDoc(joinRoomRef, {
        members: targetRoom && [currentUser.userTag, ...targetRoom?.members],
      })
    }

    router.push(`rooms/${roomTag}`)
  }

  return (
    <section className='wrap'>
      <Header title='Invitation' />
      <div className='w-full mb-4'>
        {matchInvites.length ? (
          matchInvites.map((room) => (
            <button
              onClick={() => acceptInvite(room.roomID)}
              key={room.roomID}
              className='card w-full text-left btnEffect flex-between h-[70px] mb-2'
            >
              <div className='leading-5'>
                <p className='text-f9'>{room.name}</p>
                <p className='text-sm'>Accept Invitation</p>
              </div>

              <BiDoorOpen className='icon' />
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
    </section>
  )
}

export default Invites
