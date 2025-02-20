import React from 'react'
import ButtonVote from './ButtonVote'

const CardPost = ({post}) => {
  return (
    <li className='bg-base-100 p-4 rounded-lg shadow-lg flex justify-between items-start gap-2'>
        <div>
            <h3 className='font-bold mb-1 text-lg'>{post.title}</h3>
            <p className='opacity-80 leading-relaxed max-h-32 overflow-scroll'>
                {post.description}</p>
        </div>
        <ButtonVote postId={`${post._id}`} initialVoted={false} initialVotesCounter={post.votesCounter}/>
        </li>
  )
}

export default CardPost

