import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'
import { BsPlusSquareFill, BsCalendarFill, BsXSquareFill } from 'react-icons/bs'
import {
  updateDoc,
  addDoc,
  collection,
  doc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'
import DatePicker, { ReactDatePicker } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { Container, Header } from '@/components'
import { RoomNav, RoomTask } from '@/components/Room'
import { useCollection } from '@/hooks'
import { db } from '@/config/firebase'
import { useAuth } from '@/context/AuthContext'
import useRoom from '@/hooks/useRoom'

const Room = () => {
  const [description, setDesc] = useState<string>('')
  const [dueDate, setDueDate] = useState<Date | null>(new Date())

  const router = useRouter()
  const { id } = router.query

  const [tasks] = useCollection<TaskList>(collection(db, `rooms/${id}/tasks`), {
    listen: true,
  })
  const [currentRoom] = useRoom(id)

  const { id: roomID } = currentRoom
  const { data } = useAuth()
  const { userTag } = data

  const dateInputRef = useRef<ReactDatePicker>(null)
  const memberCount = currentRoom?.members?.length + 1

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: TaskList = {
      description,
      addedBy: userTag,
      completedBy: [],
      dateAdded: serverTimestamp(),
      dueDate,
    }

    setDesc('')
    const tasksRef = collection(db, `rooms/${roomID}/tasks`)

    if (description && tasks.length < 15) {
      await addDoc(tasksRef, payload)
    }
  }

  return (
    <Container>
      <RoomNav room={currentRoom} />
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
            value={description}
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
            placeholderText='No Due Date'
            selected={dueDate}
            onChange={(date: Date) => setDueDate(date)}
            minDate={new Date()}
            ref={dateInputRef}
            className='bg-secondary text-sm w-full outline-none font-semibold placeholder-primary'
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
          {tasks?.map((task) => (
            <RoomTask key={task.id} task={task} memberCount={memberCount} />
          ))}
        </AnimatePresence>
      </div>
    </Container>
  )
}

export default Room
