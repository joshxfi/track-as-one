import React from 'react'
import { Homepage } from '../src/components/Homepage'
import { Welcome } from '../src/components/Welcome'
import { useAuth } from '../src/context/AuthContext'

const Index = () => {
  const { authUser } = useAuth()

  return <>{authUser ? <Homepage /> : <Welcome />}</>
}

export default Index
