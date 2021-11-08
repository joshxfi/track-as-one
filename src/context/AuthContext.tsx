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
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

interface AuthContextValues {
  user: User | null
  signIn: () => void
  signOut: () => void
  userLoading: boolean
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

const useAuth = () => {
  const data = useContext(AuthContext)
  return { ...data }
}

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(() => auth.currentUser)
  const router = useRouter()

  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    setUserLoading(true)
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) setUser(user)
      setUserLoading(false)
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
    } catch (err) {
      console.log(err)
    }
  }

  const signOut = async () => {
    try {
      await auth.signOut()
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, userLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export { useAuth, AuthProvider }
