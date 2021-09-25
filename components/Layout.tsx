import React from 'react'
import Head from 'next/head'
import { Navbar } from './global/Navbar'
import { Footer } from './global/Footer'
import { AuthProvider } from '../context/AuthContext'

export const Layout: React.FC<Children> = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, minimum-scale=1'
        />
        <title>taskAsOne</title>
      </Head>
      <div className='min-h-screen bg-gradient-to-tr from-[#F2F1DD] to-f9 relative pb-[240px] lg:pb-0'>
        <AuthProvider>
          <Navbar />
          <main className='text-primary w-[85%] mx-auto'>{children}</main>
          <Footer />
        </AuthProvider>
      </div>
    </>
  )
}
