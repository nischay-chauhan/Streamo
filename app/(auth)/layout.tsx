import React from 'react'

const AuthLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className='flex gap-y-4 p-1 justify-center items-center h-screen'>
        {children}
    </div>
  )
}

export default AuthLayout