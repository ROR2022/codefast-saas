import React from 'react'
import Link from 'next/link'

//eslint-disable-next-line
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