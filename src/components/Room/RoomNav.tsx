import React from 'react'
import Link from 'next/link'

interface RoomNavProps {
  room: RoomList
}

const RoomNav: React.FC<RoomNavProps> = ({ room }) => {
  const { id, members } = room

  return (
    <nav className='flex justify-evenly text-sm p-2 bg-secondary w-full rounded-b-[16px]'>
      <Link href={`${id}?tab=info`}>
        <a>room info</a>
      </Link>

      <p>members: {members?.length + 1}</p>

      <Link href={`${id}?tab=invite`}>
        <a>invite user</a>
      </Link>
    </nav>
  )
}

export default RoomNav
