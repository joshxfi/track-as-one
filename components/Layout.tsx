import React from 'react';
import Head from 'next/head';
import { Navbar } from './Navbar';

export const Layout: React.FC<Children> = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>taskAsOne</title>
      </Head>

      <main className='text-primary w-[85%] mx-auto'>{children}</main>
    </>
  );
};
