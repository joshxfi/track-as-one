import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { BsPlusSquareFill, BsCalendarFill } from 'react-icons/bs'
import { useFirestore } from '../../context/FirestoreContext'
import { addDoc, serverTimestamp } from 'firebase/firestore'

import { Header } from '../../components/global/Header'
import { RoomNav } from '../../components/room/RoomNav'
import { RoomTask } from '../../components/room/RoomTask'

const Room = () => {
  const [desc, setDesc] = useState<string>('')

  const router = useRouter()
  const { taskList, roomList, taskRef } = useFirestore()
  const { id } = router.query

  const roomInfo = roomList.find((room) => room.roomID === id)
  const roomTask = taskList.filter((task) => task.roomID === id)

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = {
      roomID: id,
      description: desc,
      dateAdded: serverTimestamp(),
    }

    setDesc('')
    await addDoc(taskRef, payload)
  }

  return (
    <>
      {roomInfo ? (
        <section className="wrap">
          <RoomNav room={roomInfo} />
          <Header title={roomInfo.name} desc={roomInfo.roomID} />
          <form onSubmit={addTask} className="w-full">
            <div className="flex justify-between items-center px-[30px] rounded-lg bg-inputbg text-primary placeholder-inputfg focus-within:border-primary border-2">
              <input
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                type="text"
                placeholder="task description"
                className="bg-inputbg h-[45px] outline-none w-full pr-4"
              />
              <div className="text-primary text-2xl flex">
                <BsCalendarFill className="mr-2" />
                <button type="submit">
                  <BsPlusSquareFill />
                </button>
              </div>
            </div>
          </form>
          <div className="w-full my-4">
            {roomTask.map((task) => (
              <RoomTask key={task.id} task={task} />
            ))}
          </div>
        </section>
      ) : (
        <p>room not found</p>
      )}
    </>
  )
}

export default Room
