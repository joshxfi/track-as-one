import React from 'react'
import { Error, Container } from '@/components'


const Error404 = () => {
  return (
    <Container>
      <Error code='404' info='page not found' />
    </Container>
  )
}

export default Error404
