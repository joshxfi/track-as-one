/* eslint-disable react/button-has-type */
import React from 'react'
import { useRouter } from 'next/router'
import type { IconType } from 'react-icons'

interface HrefButtonProps extends LinkButtonProps {}

export const Button = ({ desc, href, type, Icon }: HrefButtonProps) => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(href ?? '')}
      className='btn btnEffect'
      type={type}
    >
      <p className='mr-4'>{desc}</p>
      <Icon className='icon' />
    </button>
  )
}
