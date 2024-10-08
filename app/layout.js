"use client"


import Navbar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const RootLayout = ({ children, pageProps }) => {


  return (
    <html>
      <body className='text-text bg-background'>
        <SessionProvider session={null}>
          <Navbar />
          <div>{children}</div>
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout