import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

//eslint-disable-next-line
const LayoutPrivate = async ({children}) => {
    const session = await auth();
    if(!session) {
        redirect('/')
    }
  return (
    <div>{children}</div>
  )
}

export default LayoutPrivate
