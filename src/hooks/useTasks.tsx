/* eslint-disable no-undef */
import { useEffect, useState, useCallback } from 'react'
import { getDocs, collection, query, orderBy } from 'firebase/firestore'
import { useFirestore } from '@/context/FirestoreContext'

const useTasks = (roomId: string | undefined) => {
  const [data, setData] = useState<TaskList[]>()
  const { db, setDataLoading } = useFirestore()

  const taskRef = query(
    collection(db, `roomList/${roomId}/tasks`),
    orderBy('dateAdded')
  )

  const fetchTasks = useCallback(async () => {
    const querySnapshot = await getDocs(taskRef)
    let newTasks: TaskList[] = []

    querySnapshot.forEach((doc) => {
      const task = { ...doc.data() }
      newTasks = [task as TaskList, ...newTasks]
    })

    setData(newTasks)
    setDataLoading(false)
  }, [taskRef])

  useEffect(() => {
    setDataLoading(true)
    fetchTasks()
  }, [fetchTasks])

  return data
}

export default useTasks
