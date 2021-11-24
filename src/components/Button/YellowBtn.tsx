import React from 'react';

interface YellowBtnProps extends ButtonProps {}

const YellowBtn = ({
  styles,
  desc,
  Icon,
  iconSize,
  handleClick,
}: YellowBtnProps) => {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={`${styles} rounded-[36px]
      bg-gradient-to-tr from-secondary to-[#FFDC54] p-2 w-[230px]
      } px-[50px] font-semibold mt-4 btnEffect flex-between`}
    >
      <p className='mr-4'>{desc}</p> <Icon className={`${iconSize}`} />
    </button>
  );
};

export default YellowBtn;
