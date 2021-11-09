/* eslint-disable no-console */
import React, { useContext, createContext, useState, useEffect } from 'react'
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

interface AuthContextValues {
  user: User | null
  signIn: () => void
  signOut: () => void
  loading: boolean
  data: UserList
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

const useAuth = () => {
  const data = useContext(AuthContext)
  return { ...data }
}

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(() => auth.currentUser)
  const router = useRouter()

  const [userLoading, setUserLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({} as UserList)

  useEffect(() => {
    setUserLoading(() => true)
    const unsub = auth.onAuthStateChanged((_user) => {
      if (_user) setUser(_user)
      else setUser(null)
      setUserLoading(() => false)
    })

    return unsub
  }, [])

  const signIn = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const _user = await signInWithPopup(auth, provider)
      const moreInfo = getAdditionalUserInfo(_user)

      const { uid, email, metadata, photoURL } = _user.user

      if (moreInfo?.isNewUser) {
        const payload: UserList = {
          userTag: `user:${nanoid(5)}`,
          username: email?.split('@')[0].toLowerCase().concat(nanoid(2)),
          roomsCreated: [],
          roomsJoined: [],
          invites: [],
          dateJoined: metadata.creationTime,
          photoURL,
          email,
        }

        await setDoc(doc(db, 'users', uid), payload)
      }

      router.push('/home')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setDataLoading(() => true)
    const getUserData = async () => {
      if (user) {
        const res = await getDoc(doc(db, 'users', user.uid))
        const data = { ...res.data(), id: res.id }
        setData(data as UserList)
      }

      setDataLoading(() => false)
    }

    getUserData()
  }, [user])

  useEffect(() => {
    if (userLoading || dataLoading) setLoading(() => true)
    else setLoading(() => false)
  }, [userLoading, dataLoading])

  const signOut = async () => {
    try {
      await auth.signOut()
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, data, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export { useAuth, AuthProvider }
