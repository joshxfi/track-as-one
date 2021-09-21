import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { BsPlusSquareFill } from 'react-icons/bs'
import { useFirestore } from '../../context/FirestoreContext'
import { addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore'

import { Header } from '../../components/global/Header'
import { RoomNav } from '../../components/room/RoomNav'
import { RoomTask } from '../../components/room/RoomTask'
import { nanoid } from 'nanoid'
import { useAuth } from '../../context/AuthContext'
import { dateToday } from '../../config/misc'
import { NotFound } from '../../components/NotFound'

const Room = () => {
  const [desc, setDesc] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>(dateToday)

  const router = useRouter()
  const { roomList, taskRef, roomRef, userList, db } = useFirestore()
  const { uid } = useAuth()
  const { id } = router.query

  const roomInfo = roomList.find((room) => room.roomID === id)
  const currentUser = userList.find((user) => user.uid === uid)

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: TaskList = {
      id: nanoid(9),
      description: desc,
      addedBy: currentUser?.userTag,
      dateAdded: dateToday,
      dueDate: dueDate,
    }

    setDesc('')
    const roomDocRef = doc(db, 'roomList', `${roomInfo?.roomID}`)

    if (roomInfo?.tasks) {
      await updateDoc(roomDocRef, {
        tasks: [payload, ...roomInfo?.tasks],
      })
    }
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
                <button type="submit">
                  <BsPlusSquareFill />
                </button>
              </div>
            </div>
            <input
              type="date"
              className="outline-none w-full px-[30px] h-[45px] rounded-lg bg-primary text-secondary mt-2"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />
          </form>
          <div className="w-full my-4">
            {/* {roomTask.map((task) => (
              <RoomTask key={task.id} task={task} />
            ))} */}
          </div>
        </section>
      ) : (
        <NotFound />
      )}
    </>
  )
}

export default Room
