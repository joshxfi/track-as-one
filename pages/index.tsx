import React from 'react'
import { Homepage } from '@/components/Homepage'
import { Welcome } from '@/components/Welcome'
import { useAuth } from '@/context/AuthContext'
import { Layout } from '@/components/Layout'

const Index = () => {
  const { authUser } = useAuth()

  return <Layout>{authUser ? <Homepage /> : <Welcome />}</Layout>
}

export default Index
