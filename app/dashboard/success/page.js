import React from 'react'
import Link from 'next/link'

const SuccessPage = () => {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center gap-8'>
        <h1
        className='text-xl font-bold text-center'
        >Thanks for your purchase ❤️</h1>
        <Link 
        className='btn btn-primary'
        href="/dashboard" >
            Go back to dashboard
        </Link>
    </main>
  )
}

export default SuccessPage