import { useEffect, useState } from 'react'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'
import { useFirestore } from '@/context/FirestoreContext'

const useTasks = (roomId: string | undefined) => {
  const [data, setData] = useState<TaskList[]>()
  const { db } = useFirestore()

  const taskRef = query(
    collection(db, `roomList/${roomId}/tasks`),
    orderBy('dateAdded')
  )

  useEffect(() => {
    const unsub = onSnapshot(taskRef, async (docs) => {
      let newTasks: TaskList[] = []

      docs.forEach((doc) => {
        const tasks = { ...doc.data(), id: doc.id }
        newTasks = [tasks as TaskList, ...newTasks]
      })

      setData(newTasks)
    })

    return unsub
  }, [db, taskRef])

  return data
}

export default useTasks
