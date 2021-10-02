import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Error } from './Global/Error'

const Container = ({ children }: Children) => {
  const { authUser } = useAuth()

  return (
    <section className='wrap'>
      {authUser ? children : <Error code='401' info='you are not signed in' />}
    </section>
  )
}

export default Container
