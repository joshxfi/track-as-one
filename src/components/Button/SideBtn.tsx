import React from 'react';
import { IconType } from 'react-icons';

interface TaskBtnProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  buttonType: 'check' | 'close';
  Icon: IconType;
  iconStyle?: string;
}

const TaskBtn = ({ buttonType, Icon, iconStyle, ...rest }: TaskBtnProps) => {
  return (
    <button
      {...rest}
      className={`absolute h-full top-0 w-12 flex justify-center items-center group-hover:text-white transition-all duration-300 ${
        buttonType === 'check'
          ? 'bg-green-500 text-green-500 -left-14 group-hover:left-0 rounded-tl rounded-bl'
          : 'bg-red-500 text-red-500 -right-14 group-hover:right-0'
      }`}
      type='button'
    >
      <Icon className={iconStyle} />
    </button>
  );
};

export default TaskBtn;
