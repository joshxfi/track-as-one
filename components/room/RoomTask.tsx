import React from 'react'
import { BsTrashFill } from 'react-icons/bs'

export const RoomTask: React.FC<RoomTaskProps> = ({ task }) => {
  return (
    <div className="flex justify-between items-center px-[30px] h-[70px] rounded-lg mb-2 bg-primary text-secondary">
      <div className="leading-5">
        <p className="text-f9">{task.description}</p>
        <p className="text-sm">due: {task.roomID}</p>
      </div>

      <BsTrashFill className="icon" />
    </div>
  )
}
