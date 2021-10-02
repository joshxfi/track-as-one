import React from 'react'
import Link from 'next/link'

export const RoomNav: React.FC<RoomNavProps> = ({ room }) => {
  const { roomID, members } = room || {}

  return (
    <nav className='flex justify-evenly text-sm p-2 bg-secondary w-full rounded-b-[16px]'>
      <Link href={`/info/${roomID}`}>
        <a>room info</a>
      </Link>

      <p>members: {members.length + 1}</p>

      <Link href={`/invite/${roomID}`}>
        <a>invite user</a>
      </Link>
    </nav>
  )
}
