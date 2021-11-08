import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { Error } from './Global/Error'
import { Layout } from './Layout/Layout'

interface ContainerProps {
  styles?: string
  children: React.ReactNode
}

const Container = ({ styles, children }: ContainerProps) => {
  const { authUser } = useAuth()

  return (
    <Layout>
      <section className={`wrap ${styles}`}>
        {authUser ? (
          children
        ) : (
          <Error code='401' info='you are not signed in' />
        )}
      </section>
    </Layout>
  )
}

export default Container
