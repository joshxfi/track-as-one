import React from 'react'

export const InfoBtn = ({ desc, handleClick }: InfoBtnProps) => {
  return (
    <button
      onClick={handleClick}
      className={`card w-full h-[50px] outline-none btnEffect ${
        desc === 'DELETE ROOM' && 'mr-2'
      }`}
    >
      {desc}
    </button>
  )
}
