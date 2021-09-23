import React from 'react'
import { Header } from '../components/global/Header'
import { BiDoorOpen } from 'react-icons/bi'

const roomName = ['John Doe Room', 'Some random kid room', 'a nobody room']

const Invites: React.FC = () => {
  return (
    <section className="wrap">
      <Header title="Invitation" />
      <div className="w-full mb-4">
        {roomName.map((room) => (
          <div
            key={room}
            className="flex-between px-[30px] h-[70px] rounded-lg mb-2 bg-primary text-secondary"
          >
            <div className="leading-5">
              <p className="text-f9">{room}</p>
              <p className="text-sm">Accept Invitation</p>
            </div>

            <BiDoorOpen className="icon" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Invites
