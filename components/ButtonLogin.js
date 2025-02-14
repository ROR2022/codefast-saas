"use client";
import React from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react';

const dashboardUrl = '/dashboard'

//eslint-disable-next-line
const ButtonLogin = ({ session, extraStyle}) => {

  const handleLogin = () => {
    signIn(undefined, { callbackUrl: dashboardUrl });
  }
  
  if(session) {
    //eslint-disable-next-line
    const name = session.user?.name?.split(' ')[0] || 'friend'
    return (
        <Link 
        href={dashboardUrl}
        className={`btn btn-primary ${extraStyle? extraStyle : ''}`}
        >
          
            Welcome back {name}
        </Link>
    )
  }

  return <button className={`btn btn-primary ${extraStyle? extraStyle : ''}`} onClick={handleLogin}>Get Started</button>
}

export default ButtonLogin

// 1. Create a /login page

// 2. Create a email/password form

// 3. Make a POST request to /api/auth