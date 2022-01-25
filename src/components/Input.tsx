import React from 'react';

const Input: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = ({ ...rest }) => {
  return (
    <input
      {...rest}
      spellCheck='false'
      autoComplete='off'
      className='w-[95%] md:w-[550px] h-[36px] mb-2 bg-inputbg rounded-[36px] px-[20px] text-sm outline-none border-2 focus:border-primary'
      type='text'
    />
  );
};

export default Input;
