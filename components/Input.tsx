import React from 'react'

export const Input: React.FC<InputProps> = ({
  handleChange,
  value,
  placeholder,
}) => {
  return (
    <input
      onChange={handleChange}
      value={value}
      className='w-[450px] md:w-[550px] h-[36px] bg-inputbg rounded-[36px] px-[20px] text-sm outline-none border-2 focus:border-primary'
      type='text'
      placeholder={placeholder}
    />
  )
}
