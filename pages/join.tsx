import React, { useState } from 'react'
import { Header } from '../components/global/Header'
import { VscSignIn } from 'react-icons/vsc'
import { Button } from '../components/global/Button'
import { Input } from '../components/Input'

const Join = () => {
  const [roomID, setRoomID] = useState<string>('')

  return (
    <section className='wrap'>
      <Header title='Join a Room' />
      <div className='w-full flex justify-center flex-col'>
        <Input
          handleChange={(e) => setRoomID(e.target.value)}
          value={roomID}
          placeholder='enter room id'
        />
        <div className='inline-block mx-auto mt-6'>
          <Button
            desc='join room'
            href={roomID && `rooms/${roomID}`}
            Icon={VscSignIn}
          />
        </div>
      </div>
    </section>
  )
}

export default Join
