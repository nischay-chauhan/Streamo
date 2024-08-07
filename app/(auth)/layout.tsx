import React from 'react'
import { Logo } from './_components/logo'

const AuthLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className='flex gap-y-6 p-1 flex-col justify-center items-center h-screen'>
      <Logo />
        {children}
    </div>
  )
}

export default AuthLayout