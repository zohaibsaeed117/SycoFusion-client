import React from 'react'

const PostSkelton = () => {
    return (
        <div className='bg-card text-card-foreground border shadow-md border-border rounded-xl w-full max-w-[40rem] flex flex-col gap-y-4 p-4'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center justify-normal gap-x-5'>
                    <div className='rounded-full h-14 w-14 bg-gray-300 animate-pulse' />
                    <div>
                        <div className='w-32 h-5 bg-gray-300 animate-pulse rounded-md mb-2' />
                        <div className='w-20 h-4 bg-gray-300 animate-pulse rounded-md' />
                    </div>
                </div>
                <div className='h-6 w-6 bg-gray-300 animate-pulse rounded-full' />
            </div>
            <div className='w-full h-4 bg-gray-300 animate-pulse rounded-md mt-2' />
            <div className='w-full h-4 bg-gray-300 animate-pulse rounded-md mt-2' />
            <div className='w-full h-4 bg-gray-300 animate-pulse rounded-md mt-2' />
            <div className='h-40 w-full bg-gray-300 animate-pulse rounded-md mt-4' />

            <div className='w-full flex items-center justify-between mt-4'>
                <div className='flex items-center gap-x-4'>
                    <div className='h-6 w-6 bg-gray-300 animate-pulse rounded-full' />
                    <div className='w-8 h-4 bg-gray-300 animate-pulse rounded-md' />
                </div>
                <div className='flex items-center gap-x-4'>
                    <div className='h-6 w-6 bg-gray-300 animate-pulse rounded-full' />
                    <div className='w-8 h-4 bg-gray-300 animate-pulse rounded-md' />
                </div>
                <div className='flex items-center gap-x-4'>
                    <div className='h-6 w-6 bg-gray-300 animate-pulse rounded-full' />
                    <div className='w-8 h-4 bg-gray-300 animate-pulse rounded-md' />
                </div>
            </div>
            <div className='w-full flex items-center justify-between mt-4'>
                <div className='flex items-center gap-x-4 w-full'>
                    <div className='w-full h-10 bg-gray-300 animate-pulse rounded-md' />
                    <div className='h-10 w-10 bg-gray-300 animate-pulse rounded-full' />
                </div>
            </div>
        </div>

    )
}

export default PostSkelton
