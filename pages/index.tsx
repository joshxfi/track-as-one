import React from 'react'
import { Homepage } from '@/components/Homepage'
import { Welcome } from '@/components/Welcome'
import { useAuth } from '@/context/AuthContext'

const Index = () => {
  const { authUser } = useAuth()

  return <>{authUser ? <Homepage /> : <Welcome />}</>
}

export default Index
