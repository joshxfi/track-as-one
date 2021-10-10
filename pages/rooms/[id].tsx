import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import useTasks from 'src/hooks/useTasks'
import { AnimatePresence } from 'framer-motion'
import { BsPlusSquareFill, BsCalendarFill, BsXSquareFill } from 'react-icons/bs'
import {
  updateDoc,
  addDoc,
  collection,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import DatePicker, { ReactDatePicker } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { useFirestore } from '@/context/FirestoreContext'
import Container from '@/components/Container'
import { Header } from '@/components/Global/Header'
import { RoomNav } from '@/components/Room/RoomNav'
import { RoomTask } from '@/components/Room/RoomTask'

const Room = () => {
  const [desc, setDesc] = useState<string>('')
  const [dueDate, setDueDate] = useState<Date | null>(new Date())

  const router = useRouter()
  const { id } = router.query

  const { roomList, currentUser, db } = useFirestore()

  const currentRoom = roomList?.find((room) => room.roomID === id)
  const { roomID } = currentRoom ?? {}

  const roomTasks = useTasks(roomID)

  const { userTag } = currentUser ?? {}
  const dateInputRef = useRef<ReactDatePicker>(null)

  const memberCount = currentRoom!?.members?.length + 1

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: TaskList = {
      description: desc,
      addedBy: userTag,
      completedBy: [],
      dateAdded: new Date().toDateString(),
      dueDate: dueDate ? dueDate?.toDateString() : 'none',
    }

    setDesc('')
    const tasksRef = collection(db, `roomList/${roomID}/tasks`)

    if (desc !== '' && roomTasks!.length < 15) {
      await addDoc(tasksRef, payload)
    }
  }

  const delTask = async (id: string) => {
    const delTaskRef = doc(db, `roomList/${roomID}/tasks/${id}`)

    await deleteDoc(delTaskRef)
  }

  const doneTask = async (id: string) => {
    const tasksRef = doc(db, `roomList/${roomID}/tasks/${id}`)
    const currentTasks = roomTasks?.find((task) => task.id === id)
    const { completedBy } = currentTasks || {}

    if (!completedBy?.includes(userTag as string))
      await updateDoc(tasksRef, {
        completedBy: [userTag, ...(completedBy ?? [])],
      })
  }

  return (
    <Container>
      <RoomNav room={currentRoom as RoomList} />
      <Header title={currentRoom?.name} desc='' />
      <form
        spellCheck='false'
        autoComplete='off'
        onSubmit={addTask}
        className='w-full'
      >
        <div className='flex-between px-[30px] rounded-lg bg-inputbg text-primary placeholder-inputfg focus-within:border-primary border-2'>
          <input
            maxLength={150}
            minLength={5}
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
            className='bg-secondary text-sm w-full outline-none font-semibold'
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
          {roomTasks?.map((task) => (
            <RoomTask
              key={task.id}
              task={task}
              delTask={delTask}
              doneTask={doneTask}
              memberCount={memberCount}
            />
          ))}
        </AnimatePresence>
      </div>
    </Container>
  )
}

export default Room
