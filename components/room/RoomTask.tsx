import React from 'react'
import { BsTrashFill } from 'react-icons/bs'

export const RoomTask: React.FC<RoomTaskProps> = ({ task, delTask }) => {
  const deadline = new Date(task.dueDate).toDateString()

  return (
    <div className="flex justify-between items-center px-[30px] h-[70px] rounded-lg mb-2 bg-primary text-secondary">
      <div className="leading-5">
        <p className="text-f9">{task.description}</p>
        <p className="text-sm">due → {deadline}</p>
      </div>

      <BsTrashFill
        onClick={() => delTask(task.id)}
        className="icon cursor-pointer"
      />
    </div>
  )
}
