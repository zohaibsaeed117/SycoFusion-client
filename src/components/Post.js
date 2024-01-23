import React from 'react'
const Post = () => {
    return (
        <div className='border border-white max-w-[50rem] rounded-2xl my-4 mx-auto'>
            <header>
                <div className='flex gap-3'>
                    <img src="./abc.jpg" alt="profilepic" className=' h-12 w-12 object-cover rounded-full border border-red-800' />
                    <div className='flex flex-col'>
                        <p className=' font-medium'>Zohaib Saeed</p>
                        <p className='text-gray-200 font-extralight text-sm'>8h</p>
                    </div>
                </div>
            </header>
            <div className='p-2 text-sm sm:text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, consequuntur? Commodi nam reiciendis porro enim quis pariatur cupiditate magnam nihil nesciunt
            </div>
            <img src="./abc.jpg" alt="post" className='max-h-[40rem] w-full object-contain' />
            <div className='flex'>
                <div className='text-center w-full h-full text-xl cursor-pointer hover:text-gray-400'>
                    <p>Like</p>
                    <p>100</p>
                </div>
                <div className='text-center w-full h-full text-xl cursor-pointer hover:text-gray-400'>
                    <p>Comments</p>
                    <p>100</p>
                </div>
                <div className='text-center w-full h-full text-xl cursor-pointer hover:text-gray-400'>
                    <p>Share</p>
                    <p>100</p>
                </div>
               </div>
        </div >
    )
}

export default Post
