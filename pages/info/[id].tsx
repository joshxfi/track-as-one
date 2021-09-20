import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineIdcard } from 'react-icons/ai'
import { BsCalendarFill } from 'react-icons/bs'
import { Header } from '../../components/global/Header'
import { RoomNav } from '../../components/room/RoomNav'
import { useFirestore } from '../../context/FirestoreContext'

const RoomInfo: React.FC = () => {
  const { roomList, userList } = useFirestore()

  const router = useRouter()
  const { id } = router.query
  const currentRoom = roomList.find((room) => room.roomID === id)
  const roomCreator = userList.find(
    (user) => user.userTag === currentRoom?.creator
  )
  const dateCreated = currentRoom?.dateAdded.toDate().toDateString()

  const defaultPic =
    'https://lh3.googleusercontent.com/a-/AOh14Gg0-BgMxN9qRwfVx_Sr59TtL0mH5eJhcuKIRYj1=s96-c'

  return (
    <section className="wrap">
      <RoomNav room={currentRoom} />
      <Header title="Room Info" desc={`room id → ${currentRoom?.roomID}`} />

      <div className="flex justify-between items-center px-[30px] h-[70px] rounded-lg mb-2 bg-primary text-secondary w-full">
        <div className="leading-5">
          <p className="text-f9 text-sm">{dateCreated}</p>
          <p className="text-sm">room created</p>
        </div>

        <BsCalendarFill className="icon" />
      </div>

      <div className="w-full mb-4">
        <div className="flex justify-between items-center px-[30px] h-[70px] rounded-lg mb-2 bg-primary text-secondary">
          <div className="flex">
            <div className="h-9 w-9 bg-secondary rounded-full mr-4 overflow-hidden">
              <Image
                src={roomCreator?.photoURL ? roomCreator?.photoURL : defaultPic}
                height={36}
                width={36}
                alt="creator profile picture"
              />
            </div>
            <div className="leading-5">
              <p className="text-f9">{roomCreator?.displayName}</p>
              <p className="text-sm">creator</p>
            </div>
          </div>

          <AiOutlineIdcard className="icon text-xl" />
        </div>
      </div>
    </section>
  )
}

export default RoomInfo
