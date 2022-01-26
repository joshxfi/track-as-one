import React from 'react';

interface InfoBtnProps {
  title: string;
  handleClick: () => void;
}

const InfoBtn = ({ title, handleClick }: InfoBtnProps) => {
  return (
    <button
      type='button'
      onClick={handleClick}
      className='rounded px-4 py-2 bg-red-600 text-white text-sm hover:bg-red-600/90 transition-colors'
    >
      {title}
    </button>
  );
};

export default InfoBtn;
