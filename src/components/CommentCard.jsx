import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const CommentCard = ({ author, message, }) => {
    return (
        <div className='flex items-center justify-center gap-x-4' >
            <Avatar className="w-10 h-10 ">
                <AvatarImage src={author?.avatar} />
                <AvatarFallback>{author.firstName ? (author.firstName[0] + author.lastName[0]) : "AZ"}</AvatarFallback>
            </Avatar>
            <div className='bg-accent rounded-xl py-2 px-4'>
                <h3 className='text-sm font-semibold'>{author?.username}</h3>
                <p className='text-[12px]'>{message}</p>
            </div>
        </div>
    )
}

export default CommentCard
