import React from 'react'

interface TaskBtnProps extends ButtonProps {}

export const TaskBtn = ({
  styles,
  desc,
  Icon,
  iconSize,
  handleClick,
}: TaskBtnProps) => {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={`${styles} rounded-lg w-full
        bg-secondary py-2 px-4 font-semibold btnEffect flex-between`}
    >
      <p className='mr-4'>{desc}</p> <Icon className={`${iconSize}`} />
    </button>
  )
}

export default TaskBtn