import React from 'react'
import { Error } from '@/components/Global/Error'
import Container from '@/components/Container'

const Error404 = () => {
  return (
    <Container>
      <Error code='404' info='page not found' />
    </Container>
  )
}

export default Error404
