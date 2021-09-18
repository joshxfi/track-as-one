import React, { useState } from 'react'
import { Header } from '../components/global/Header'
import { VscSignIn } from 'react-icons/vsc'
import { Button } from '../components/global/Button'

const Join = () => {
  const [roomID, setRoomID] = useState<string>('')

  return (
    <section className="wrap">
      <Header title="Join a Room" />
      <div className="w-full flex justify-center flex-col">
        <input
          onChange={(e) => setRoomID(e.target.value)}
          value={roomID}
          className="h-[36px] bg-inputbg rounded-[36px] px-[20px] text-sm outline-none border-2 focus:border-primary"
          type="text"
          placeholder="enter room id"
        />
        <div className="inline-block mx-auto mt-6">
          <Button desc="join room" href={`rooms/${roomID}`} Icon={VscSignIn} />
        </div>
      </div>
    </section>
  )
}

export default Join
