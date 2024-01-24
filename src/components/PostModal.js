import React from 'react'
import { FaEllipsis, FaMessage, FaPaperPlane, FaShare, FaThumbsUp } from 'react-icons/fa6'
import Comment from './Comment'
const PostModal = () => {
    return (
        <div className='modal-box w-11/12 max-w-[50rem] my-4 mx-auto shadow-lg rounded-xl'>
            <header className='flex items-center justify-between m-2'>
                <div className='flex gap-3'>
                    <img src="./abc.jpg" alt="profilepic" className='h-12 w-12 object-cover rounded-full border' />
                    <div className='flex flex-col'>
                        <p className=' font-medium'>Zohaib Saeed</p>
                        <p className='text-gray-800 font-extralight text-sm'>8h</p>
                    </div>
                    <div className='badge my-auto badge-primary'>Acheivement</div>
                </div>
                <div className='flex items-center justify-center'>
                    <div className='dropdown dropdown-left'>
                        <div tabIndex={0} role="button" className="btn shadow-none border-none rounded-full bg-transparent m-1"><span className=''><FaEllipsis /></span></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>This is option 1</a></li>
                            <li><a>This is option 2</a></li>
                        </ul>
                    </div>
                    <form method="dialog">
                        <button className="btn shadow-none border-none rounded-full bg-transparent m-1">✕</button>
                    </form>
                </div>

            </header>
            <div className='px-4 my-2 text-sm sm:text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius omnis temporibus consectetur officiis eos non est cum culpa ad tempore, deserunt earum quis? Ab quia asperiores cum odio iste itaque laborum distinctio. Quaerat molestiae vel asperiores tempora odit iusto, recusandae ipsam quidem doloribus maxime accusantium harum nulla fugiat reiciendis architecto sint est ab necessitatibus officiis perspiciatis cumque nisi maiores quasi?</div>
            <img src="./abc.jpg" alt="post" className='max-h-[30rem] w-full object-contain' />
            <div className='flex items-center justify-evenly py-2'>
                <button className='btn border-none shadow-none bg-transparent text-center text-md cursor-pointer hover:text-gray-400 sm:text-lg'>
                    <FaThumbsUp />
                    <p>Like</p>
                    <p>100</p>
                </button>
                <button className='btn border-none shadow-none bg-transparent text-center text-md cursor-pointer hover:text-gray-400 sm:text-lg'>
                    <FaMessage />
                    <p>Comments</p>
                    <p>100</p>
                </button>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button className='btn border-none shadow-none bg-transparent text-center text-md cursor-pointer hover:text-gray-400 sm:text-lg'>
                    <FaShare />
                    <p>Share</p>
                    <p>100</p>
                </button>
            </div>
            <div className='join w-full'>
                <input type="text" placeholder="Enter your comment" className="input input-primary input-bordered join-item w-full" />
                <button className="btn join-item rounded-r-full btn-primary"><FaPaperPlane /></button>
            </div>
            <div className='my-2'>
                <Comment />
            </div>
        </div >
    )
}
export default PostModal
