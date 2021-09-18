import React from 'react'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'
import { AiOutlineIdcard } from 'react-icons/ai'
import { BsCalendarFill } from 'react-icons/bs'
import { Header } from '../../components/global/Header'
import { RoomNav } from '../../components/room/RoomNav'
import { useFirestore } from '../../context/FirestoreContext'

const RoomInfo: React.FC = () => {
  const { roomList } = useFirestore()

  const router = useRouter()
  const { id } = router.query
  const currentRoom = roomList.find((room) => room.roomID === id)
  const dateCreated = currentRoom?.dateAdded.toDate().toString()

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
        {roomList
          .filter((room) => room.roomID === id)
          .map((room) => (
            <div
              key={nanoid(10)}
              className="flex justify-between items-center px-[30px] h-[70px] rounded-lg mb-2 bg-primary text-secondary"
            >
              <div className="flex">
                <div className="h-9 w-9 bg-secondary rounded-full mr-4"></div>
                <div className="leading-5">
                  <p className="text-f9">{room.name}</p>
                  <p className="text-sm">members:</p>
                </div>
              </div>

              <AiOutlineIdcard className="icon text-xl" />
            </div>
          ))}
      </div>
    </section>
  )
}

export default RoomInfo
