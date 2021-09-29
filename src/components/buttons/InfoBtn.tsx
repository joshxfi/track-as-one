import React from 'react'

export const InfoBtn = ({ desc, style, handleClick }: InfoBtnProps) => {
  return (
    <button
      onClick={handleClick}
      className={`card w-full h-[50px] outline-none btnEffect text-sm ${style}`}
    >
      {desc}
    </button>
  )
}
