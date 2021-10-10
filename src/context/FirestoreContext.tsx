import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { nanoid } from 'nanoid'
import { collection, setDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuth } from './AuthContext'

const FirestoreContext = createContext<FirestoreContextValues>(
  {} as FirestoreContextValues
)
const useFirestore = () => {
  return useContext(FirestoreContext)
}

const FirestoreProvider: React.FC = ({ children }) => {
  const { authUser, uid, displayName, photoURL } = useAuth()

  const [userList, setUserList] = useState<UserList[]>([])
  const [roomList, setRoomList] = useState<RoomList[]>([])

  const [dataLoading, setDataLoading] = useState(true)

  const currentUser = userList.find((user) => user.uid === uid)

  const userRef = collection(db, 'userList')
  const roomRef = collection(db, 'roomList')

  // get users from firebase

  const fetchUsers = useCallback(async () => {
    const userID = `user:${nanoid(5)}`
    let UsersCopy: UserList[] = []

    const querySnapshot = await getDocs(userRef)
    querySnapshot.forEach((doc) => {
      let user = { ...doc.data() }
      UsersCopy = [user as UserList, ...UsersCopy]
    })

    const userExists = UsersCopy.some((user) => uid === user.uid)
    if (!userExists && authUser !== null) {
      const payload: UserList = {
        userTag: userID,
        roomsCreated: [],
        roomsJoined: [],
        invites: [],
        dateJoined: new Date().toDateString(),
        uid,
        displayName,
        photoURL,
      }

      await setDoc(doc(db, 'userList', userID), payload)
      UsersCopy = [payload, ...UsersCopy]
    }

    setUserList(UsersCopy)
    setDataLoading(false)
  }, [authUser, displayName, photoURL, uid, userRef])

  // get room list from firebase

  const fetchRooms = useCallback(async () => {
    const querySnapshot = await getDocs(roomRef)
    let RoomsCopy: RoomList[] = []
    querySnapshot.forEach((doc) => {
      const room = { ...doc.data() }
      RoomsCopy = [room as RoomList, ...RoomsCopy]
    })

    setRoomList(RoomsCopy)
    setDataLoading(false)
  }, [roomRef])

  useEffect(() => {
    setDataLoading(true)
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    setDataLoading(true)
    fetchRooms()
  }, [fetchRooms])

  const values: FirestoreContextValues = {
    db,
    userList,
    roomList,
    userRef,
    roomRef,
    currentUser,
    dataLoading,
    setDataLoading
  }

  return (
    <FirestoreContext.Provider value={values}>
      {children}
    </FirestoreContext.Provider>
  )
}

export { useFirestore, FirestoreProvider }
