import React from 'react';

interface InfoBtnProps {
  desc: string;
  className?: string;
  handleClick: () => void;
}

const InfoBtn = ({ desc, className, handleClick }: InfoBtnProps) => {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={`card w-full h-[50px] outline-none text-sm ${className}`}
    >
      {desc}
    </button>
  );
};

export default InfoBtn;
