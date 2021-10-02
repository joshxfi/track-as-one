import React from 'react'

export const WcButton = ({
  style,
  desc,
  Icon,
  iconSize,
  handleClick,
}: WcButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={`${style} rounded-[36px]
      bg-gradient-to-tr from-secondary to-[#FFDC54] p-2 w-[230px]
      } px-[50px] font-semibold mt-4 btnEffect flex-between`}
    >
      <p className='mr-4'>{desc}</p> <Icon className={`${iconSize}`} />
    </button>
  )
}
