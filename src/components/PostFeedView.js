"use client"
import React from 'react'
import { FaEllipsis, FaMessage, FaShare, FaThumbsUp } from 'react-icons/fa6'
import PostModal from './PostModal'
const Post = ({postId, createdAt, Username, caption, likes, postType, attachments}) => {

 return (
        <div className='max-w-[50rem] my-4 mx-auto shadow-lg rounded-xl'>
            <header className='flex items-center justify-between m-2'>
                <div className='flex gap-3'>
                    <img src={`https://ui-avatars.com/api/?name=${Username}`} alt="profilepic" className=' h-12 w-12 object-cover rounded-full border border-red-800' />
                    <div className='flex flex-col'>
                        <p className=' font-medium'>{Username}</p>
                        <p className='text-red-600 font-extralight text-sm'>{createdAt}</p>
                    </div>
                    <div className='badge my-auto badge-primary'>Acheivement</div>
                </div>
                <div className='dropdown dropdown-left'>
                    <div tabIndex={0} role="button" className="btn shadow-none border-none rounded-full bg-transparent m-1"><span className=''><FaEllipsis /></span></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>This is option 1</a></li>
                        <li><a>This is option 2</a></li>
                    </ul>
                </div>
            </header>
            <div className='p-2 text-sm sm:text-xl'>{caption}
            </div>
           {
            attachments.map((attachment, index)=> {
return (
    <img src={attachment.url} alt="post" className='max-h-[40rem] w-full object-contain' />

)
            })
           }
            <div className='flex'>
                <button className='text-center w-full h-full text-xl cursor-pointer hover:text-gray-400'>
                    <p>Like</p>
                    <p>100</p>
                </button>
                {/* <button className='btn border-none shadow-none bg-transparent text-center text-md cursor-pointer hover:text-gray-400 sm:text-lg'>
                    <FaMessage />
                    <p>Comments</p>
                    <p>100</p>
                </button> */}
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn border-none shadow-none bg-transparent" onClick={() => document.getElementById('my_modal_3').showModal()}><FaMessage />
                    <p>Comments</p>
                    <p>100</p></button>
                <dialog id="my_modal_3" className="modal">
                    <PostModal />
                </dialog>
                <button className='btn border-none shadow-none bg-transparent text-center text-md cursor-pointer hover:text-gray-400 sm:text-lg'>
                    <FaShare />
                    <p>Share</p>
                    <p>100</p>
                </button>
            </div>
        </div >
    )
}

export default Post
