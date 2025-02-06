//import React from 'react'
import Link from 'next/link'

const ButtonLink = ({linkTo}) => {
  return (
    <Link href={linkTo!=='home'?`/${linkTo}`:'/'}>
        <button className='btn btn-link'>
            {String(linkTo).toUpperCase()}
        </button>
    </Link>
  )
}

export default ButtonLink