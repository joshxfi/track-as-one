import React from 'react'

export const Header: React.FC<HeaderProps> = ({ title, desc }) => {
  return (
    <header className='mt-12 text-center mb-4 lg:mb-0 lg:text-left'>
      <h1 className='text-5xl font-bold md:text-7xl xl:text-8xl'>{title}</h1>
      <i className='text-base md:text-xl lg:text-2xl'>{desc}</i>
    </header>
  )
}

Header.defaultProps = {
  title: 'trackAsOne',
  desc: 'organize your tasks as one',
}
