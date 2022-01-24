import React from 'react';
import { IconType } from 'react-icons';

interface TaskBtnProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  Icon: IconType;
  iconStyle?: string;
}

const TaskBtn = ({ className, Icon, iconStyle, ...rest }: TaskBtnProps) => {
  return (
    <button
      {...rest}
      className={`absolute h-full top-0 w-12 flex justify-center items-center group-hover:text-white transition-all duration-300 ${className}`}
      type='button'
    >
      <Icon className={iconStyle} />
    </button>
  );
};

export default TaskBtn;
