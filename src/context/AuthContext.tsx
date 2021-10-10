/* eslint-disable no-console */
import React, { useContext, createContext, useState, useEffect } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '../config/firebase'

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: React.FC = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => auth.currentUser)
  const { uid, displayName, photoURL, email } = authUser || {}
  const router = useRouter()

  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    setUserLoading(true)
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) setAuthUser(user)
      setUserLoading(false)
    })

    return unsub
  }, [])

  const signIn = async () => {
    const provider = new GoogleAuthProvider()
    auth.useDeviceLanguage()

    try {
      await signInWithPopup(auth, provider)
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

  const values: AuthContextValues = {
    authUser,
    uid,
    displayName,
    photoURL,
    email,
    signIn,
    signOut,
    userLoading,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { useAuth, AuthProvider }
