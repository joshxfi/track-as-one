import React, { useContext, createContext, useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  setDoc,
  doc,
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
    const orderUsers = query(userRef, orderBy('dateJoined'))

    const unsub = onSnapshot(orderUsers, async (docs) => {
      const userID = `user:${nanoid(5)}`
      let newUsers: UserList[] | any[] = []

      docs.forEach((doc) => {
        let user = { ...doc.data() }
        newUsers = [user, ...newUsers]
      })

      const userExists = newUsers.some((user) => uid === user.uid)
      if (!userExists && authUser !== null) {
        const payload: UserList = {
          userTag: userID,
          roomsCreated: [],
          roomsJoined: [],
          invites: [],
          dateJoined: new Date(),
          uid,
          displayName,
          photoURL,
          email,
        }

        await setDoc(doc(db, 'userList', userID), payload)
        newUsers = [payload, ...newUsers]
      }

      setUserList(newUsers)
    })
    return unsub
  }, [db, authUser])

  // fetch rooms
  useEffect(() => {
    const unsub = onSnapshot(roomRef, (docs) => {
      let newRooms: RoomList[] | any[] = []

      docs.forEach((doc) => {
        let room = { ...doc.data(), id: doc.id }
        newRooms = [room, ...newRooms]
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
