import React from 'react'
import { Header } from '../components/global/Header'
import { VscSignIn } from 'react-icons/vsc'
import { Button } from '../components/global/Button'

const Join = () => {
  return (
    <section className="wrap">
      <Header title="Join a Room" />
      <form className="w-full flex justify-center flex-col">
        <input
          className="h-[36px] bg-inputbg rounded-[36px] px-[20px] text-sm outline-none border-2 focus:border-primary"
          type="text"
          placeholder="enter room id"
        />
        <div className="inline-block mx-auto mt-6">
          <Button desc="join room" Icon={VscSignIn} />
        </div>
      </form>
    </section>
  )
}

export default Join
