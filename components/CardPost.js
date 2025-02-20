import React from 'react'

const CardPost = ({post}) => {
  return (
    <li className='bg-base-100 p-4 rounded-lg shadow-lg flex justify-between items-center'>
        <div>
            <h3 className='font-bold mb-1'>{post.title}</h3>
            <p className='opacity-80 leading-relaxed max-h-32 overflow-scroll'>
                {post.description}</p>
        </div>
        <button className='btn btn-square'>
            UP
        </button>
        </li>
  )
}

export default CardPost

