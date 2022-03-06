import React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { IoCloseCircle } from 'react-icons/io5';
import { SideBtn } from './Button';

interface ConfirmationProps {
  check: () => void;
  close: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  check,
  close,
  children,
}) => {
  return (
    <div
      className='w-full text-left leading-5 relative px-[30px] min-h-[70px] py-4 bg-primary text-secondary rounded transition-all duration-300 flex items-center justify-between group overflow-hidden cursor-default
    hover:px-16'
    >
      <SideBtn
        onClick={check}
        buttonType='check'
        Icon={BsFillCheckCircleFill}
      />

      <SideBtn
        onClick={close}
        buttonType='close'
        Icon={IoCloseCircle}
        iconStyle='text-xl'
      />

      {children}
    </div>
  );
};

export default Confirmation;
