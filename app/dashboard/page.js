import React from 'react'
//import Link from "next/link"
import ButtonLink from "@/components/ButtonLink"
import ButtonLogout from '@/components/ButtonLogout'

export default function page()  {
  return (
    <div>
        <h2>Private Dashboard</h2>
        <div className='flex gap-4'>
        <ButtonLink linkTo="home"/>
        <ButtonLogout />
        </div>
    </div>
  )
}
