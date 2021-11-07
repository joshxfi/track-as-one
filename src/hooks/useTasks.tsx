/* eslint-disable no-undef */
import { useEffect, useState, useRef } from 'react'
import {
  getDocs,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import { useFirestore } from '@/context/FirestoreContext'

const useTasks = (roomId: string) => {
  const [data, setData] = useState<TaskList[]>()
  const { db, setDataLoading } = useFirestore()

  const taskRef = query(
    collection(db, `roomList/${roomId}/tasks`),
    orderBy('dateAdded')
  )

  useEffect(() => {
    const unsub = onSnapshot(taskRef, (docs) => {
      setDataLoading(true)
      let newTasks: TaskList[] = []

      docs.forEach((doc) => {
        const task = { ...doc.data(), id: doc.id }
        newTasks = [task as TaskList, ...newTasks]
      })

      setData(newTasks)
      setDataLoading(false)
    })

    return unsub
  }, [])

  return data
}

export default useTasks
