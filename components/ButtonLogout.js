"use client";
import React from 'react'
import { signOut } from 'next-auth/react';

const ButtonLogout = () => {
    const handleLogout = () => {
        signOut();
    }
  return (
    <button className='btn btn-ghost' onClick={handleLogout}>
        Logout
    </button>
  )
}

export default ButtonLogout