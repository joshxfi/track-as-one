import React, { useContext, createContext, useState, useEffect } from 'react'
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  addDoc,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuth } from './AuthContext'

const FirestoreContext = createContext<FirestoreContextValues>(
  {} as FirestoreContextValues
)
const useFirestore = () => {
  return useContext(FirestoreContext)
}

const FirestoreProvider: React.FC = ({ children }) => {
  const { authUser, uid, displayName, photoURL, email } = useAuth()

  const [userList, setUserList] = useState<UserList[]>([])
  const [roomList, setRoomList] = useState<RoomList[]>([])
  const [taskList, setTaskList] = useState<TaskList[]>([])

  const userRef = collection(db, 'userList')
  const roomRef = collection(db, 'roomList')
  const taskRef = collection(db, 'taskList')

  // fetch users
  useEffect(() => {
    const unsub = onSnapshot(userRef, async (docs) => {
      let newUsers: UserList[] | any[] = []

      docs.forEach((doc) => {
        let task = { ...doc.data(), id: doc.id }
        newUsers = [task, ...newUsers]
      })

      const userExists = newUsers.some((user) => uid === user.uid)
      if (!userExists && authUser !== null) {
        const payload = {
          uid,
          displayName,
          photoURL,
          email,
        }

        await addDoc(userRef, payload)
      }

      setUserList(newUsers)
    })
    return unsub
  }, [authUser])

  // fetch rooms
  useEffect(() => {
    const unsub = onSnapshot(roomRef, (docs) => {
      let newRooms: RoomList[] | any[] = []

      docs.forEach((doc) => {
        let task = { ...doc.data(), id: doc.id }
        newRooms = [task, ...newRooms]
      })

      setRoomList(newRooms)
    })
    return unsub
  }, [db])

  // fetch tasks
  useEffect(() => {
    const q = query(taskRef, orderBy('dateAdded'))

    const unsub = onSnapshot(q, (docs) => {
      let newTasks: TaskList[] | any[] = []

      docs.forEach((doc) => {
        let task = { ...doc.data(), id: doc.id }
        newTasks = [task, ...newTasks]
      })

      setTaskList(newTasks)
    })

    return unsub
  }, [db])

  const values: FirestoreContextValues = {
    db,
    userList,
    roomList,
    taskList,
    userRef,
    roomRef,
    taskRef,
  }

  return (
    <FirestoreContext.Provider value={values}>
      {children}
    </FirestoreContext.Provider>
  )
}

export { useFirestore, FirestoreProvider }
