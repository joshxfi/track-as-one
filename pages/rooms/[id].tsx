import React, { useState, useRef } from 'react'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'
import { BsPlusSquareFill, BsCalendarFill, BsXSquareFill } from 'react-icons/bs'
import { updateDoc, doc, query, where } from 'firebase/firestore'
import DatePicker, { ReactDatePicker } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { useFirestore } from '@/context/FirestoreContext'
import Container from '@/components/Container'
import { Header } from '@/components/Global/Header'
import { RoomNav } from '@/components/Room/RoomNav'
import { RoomTask } from '@/components/Room/RoomTask'
import { Error } from '@/components/Global/Error'

const Room = () => {
  const [desc, setDesc] = useState<string>('')
  const [dueDate, setDueDate] = useState<Date | null>(new Date())

  const router = useRouter()
  const { roomList, currentUser, db, roomRef } = useFirestore()
  const { id } = router.query

  const { userTag } = currentUser || {}

  const currentRoom = roomList.find((room) => room.roomID === id)
  const { creator, roomID, tasks } = currentRoom || {}

  const currentRoomRef = doc(db, 'roomList', `${roomID}`)
  const dateInputRef = useRef<ReactDatePicker>(null)

  const memberCount = currentRoom!?.members?.length + 1

  const hasPermission = () => {
    const userPermRef = query(
      roomRef,
      where('members', 'array-contains', userTag)
    )

    if (creator === userTag || userPermRef) return true
    else return false
  }

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: TaskList = {
      id: nanoid(9),
      description: desc,
      addedBy: userTag,
      completedBy: [],
      dateAdded: new Date().toDateString(),
      dueDate: dueDate ? dueDate?.toDateString() : 'none',
    }

    setDesc('')
    const roomDocRef = doc(db, 'roomList', `${roomID}`)

    if (desc !== '' && currentRoom!.tasks.length < 15) {
      await updateDoc(roomDocRef, {
        tasks: [payload, ...currentRoom!.tasks],
      })
    }
  }

  const delTask = async (id: string) => {
    const newTasks = tasks?.filter((task) => task.id !== id)

    await updateDoc(currentRoomRef, {
      tasks: newTasks,
    })
  }

  const doneTask = async (task: TaskList) => {
    const { addedBy, completedBy, dateAdded, description, dueDate, id } = task

    const copyTasks = tasks?.slice().filter((task) => task.id !== id)

    if (!completedBy.includes(userTag as string)) {
      const newTask: TaskList[] = [
        {
          id,
          addedBy: addedBy,
          completedBy: [userTag ?? '', ...(completedBy ?? [])],
          dateAdded: dateAdded,
          description: description,
          dueDate: dueDate,
        },
        ...(copyTasks ?? []),
      ]

      await updateDoc(currentRoomRef, {
        tasks: newTask,
      })
    }
  }

  return (
    <Container>
      {currentRoom ? (
        hasPermission() ? (
          <>
            <RoomNav room={currentRoom} />
            <Header title={currentRoom.name} desc='' />
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
                {currentRoom.tasks.map((task) => (
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
