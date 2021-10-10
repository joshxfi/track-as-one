import React from 'react'

interface InfoBtnProps {
  desc: string
  styles?: string
  handleClick: () => void
}

export const InfoBtn = ({ desc, styles, handleClick }: InfoBtnProps) => {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={`card w-full h-[50px] outline-none btnEffect text-sm ${styles}`}
    >
      {desc}
    </button>
  )
}
