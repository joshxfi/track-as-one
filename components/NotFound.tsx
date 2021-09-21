import React from 'react'
import Image from 'next/image'
import mascot from '../public/assets/404cat.svg'

export const NotFound = () => {
  return (
    <section className="wrap">
      <div className="w-[200px] mt-10">
        <Image src={mascot} objectFit="contain" />
      </div>
      <h1 className="font-bold text-7xl">404</h1>
      <p className="text-lg">page not found</p>
    </section>
  )
}
