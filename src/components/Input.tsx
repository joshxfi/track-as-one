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
      className='mb-2 h-[36px] w-[95%] rounded-[36px] border-2 border-gray-300 bg-inputbg px-[20px] text-sm outline-none focus:border-primary md:w-[550px]'
      type='text'
    />
  );
};

export default Input;
