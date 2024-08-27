import Image from 'next/image'
import React from 'react'

const CommentCard = () => {
    return (
        <div className='flex items-center justify-center gap-x-4' >
            <Image src={'/bucket.jpg'} height={100} width={100} className='h-12 w-12 rounded-full object-cover object-center' />
            <div className='bg-white rounded-xl py-2 px-4'>
                <h3 className='text-sm font-semibold'>Cody Rhodes</h3>
                <p className='text-[12px]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas animi totam repudiandae! Veritatis eaque earum </p>
            </div>
        </div>
    )
}

export default CommentCard
