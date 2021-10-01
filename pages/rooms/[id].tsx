import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { BsPlusSquareFill, BsCalendarFill, BsXSquareFill } from 'react-icons/bs'
import { useFirestore } from '../../src/context/FirestoreContext'
import { updateDoc, doc } from 'firebase/firestore'

import DatePicker, { ReactDatePicker } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { Header } from '../../src/components/global/Header'
import { RoomNav } from '../../src/components/room/RoomNav'
import { RoomTask } from '../../src/components/room/RoomTask'
import { nanoid } from 'nanoid'
import { Error } from '../../src/components/global/Error'
import Container from '../../src/components/Container'
import { AnimatePresence } from 'framer-motion'

const Room = () => {
  const [desc, setDesc] = useState<string>('')
  const [dueDate, setDueDate] = useState<Date | null>(new Date())

  const router = useRouter()
  const { roomList, currentUser, db } = useFirestore()
  const { id } = router.query

  const { userTag } = currentUser || {}

  const currentRoom = roomList.find((room) => room.roomID === id)
  const currentRoomRef = doc(db, 'roomList', `${currentRoom?.roomID}`)
  const dateInputRef = useRef<ReactDatePicker>(null)

  const hasPermission = () => {
    if (
      currentRoom?.creator === userTag ||
      (userTag && currentRoom?.members.includes(userTag))
    )
      return true
    else return false
  }

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: TaskList = {
      id: nanoid(9),
      description: desc,
      addedBy: currentUser?.userTag,
      dateAdded: new Date().toDateString(),
      dueDate: dueDate ? dueDate?.toDateString() : 'none',
    }

    setDesc('')
    const roomDocRef = doc(db, 'roomList', `${currentRoom?.roomID}`)

    if (currentRoom?.tasks && desc !== '' && currentRoom.tasks.length < 15) {
      await updateDoc(roomDocRef, {
        tasks: [payload, ...currentRoom?.tasks],
      })
    }
  }

  const delTask = async (id: string) => {
    console.log('clicked')
    const newTasks = currentRoom?.tasks.filter((task) => task.id !== id)

    await updateDoc(currentRoomRef, {
      tasks: newTasks,
    })
  }

  return (
    <Container>
      {currentRoom ? (
        hasPermission() ? (
          <>
            <RoomNav room={currentRoom} />
            <Header title={currentRoom.name} desc='' />
            <form onSubmit={addTask} className='w-full'>
              <div className='flex-between px-[30px] rounded-lg bg-inputbg text-primary placeholder-inputfg focus-within:border-primary border-2'>
                <input
                  maxLength={150}
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  type='text'
                  placeholder='task description'
                  className='bg-inputbg h-[45px] outline-none w-full pr-4'
                />
                <button type='submit'>
                  <BsPlusSquareFill className='text-2xl' />
                </button>
              </div>

              <div className='flex dueBtn items-center mt-2'>
                <DatePicker
                  selected={dueDate}
                  onChange={(date: Date) => setDueDate(date)}
                  minDate={new Date()}
                  ref={dateInputRef}
                  className='bg-primary w-full outline-none'
                />

                <div className=' flex text-2xl mr-[3px]'>
                  <BsCalendarFill
                    className='mr-2'
                    onClick={() => dateInputRef.current?.setFocus()}
                  />
                  <BsXSquareFill onClick={() => setDueDate(null)} />
                </div>
              </div>
            </form>
            <div className='w-full my-2'>
              <AnimatePresence>
                {currentRoom.tasks.map((task) => (
                  <RoomTask key={task.id} task={task} delTask={delTask} />
                ))}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <Error code='403' info='no permission' />
        )
      ) : (
        <Error />
      )}
    </Container>
  )
}

export default Room
