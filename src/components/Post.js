"use client"
import React, { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { FaEllipsis, FaMessage, FaShare, FaThumbsUp } from 'react-icons/fa6'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import PostModal from './PostModal'
import { useUserStore } from '@/store/store';
const Post = ({ postId, createdAt, username, caption, likes, postType, attachments }) => {
    const { Username, UserId } = useUserStore();
    const [isFollow, setIsFollow] = useState(false);
    const checkFollow = async () => {
        const response = await fetch(`/api/users/getUserId`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username })

        })
        const data = await response.json();
        const userId = data.user?._id;

        console.log(`Checking for ${userId} and ${UserId}`);
        const res = await fetch('/api/followers/check-follow', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                checkForUser: userId,
                followingUser: UserId
            })
        })
        const result = await res.json();
        console.log(result);
        if (result.isFollow) {
            setIsFollow(true);
        }
        else {
            setIsFollow(false);
        }


    }
    const addFollower = async () => {

        // finding logged in user id
        const response = await fetch(`/api/users/getUserId`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username })

        })
        const data = await response.json();
        console.log(data)
        const userId = data.user._id;


        const res = await fetch('/api/followers/follow-user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userToFollow: userId,
                followingUser: UserId
            })
        })
        const result = await res.json();
        console.log(result);
        setIsAlert(true);
        setAlertMsg(result.message);
        setAlertType(result.type);
        if (result.type == "success") {
            setIsFollow(true);
        }
        else {
            setIsFollow(false);
        }
    }
    const { setIsAlert, setAlertMsg, setAlertType } = useUserStore();


    const [totalLikes, setTotalLikes] = useState(likes.length);

    const handleLike = () => {
        console.log("Liking Post")

        const data = {
            postId: postId,
            likeUsername: Username
        }
        fetch(`/api/likes/handle-likes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setAlertMsg(data.message);
                setAlertType(data.type);
                setIsAlert(true);
                if (data.liked) {
                    setTotalLikes(totalLikes + 1)
                    console.log("Post Liked")

                }

            })
    }

    useEffect(() => {
        checkFollow();
    }, [])

    return (
        <div className='w-[85vw] max-w-[50rem] my-4 mx-auto shadow-lg rounded-xl'>
            <header className='flex items-center justify-between m-2'>
                <div className='flex gap-3'>
                    <img src={`https://ui-avatars.com/api/?name=${Username}`} alt="profilepic" className=' h-12 w-12 object-cover rounded-full border border-red-800' />
                    <div className='flex flex-col'>
                        <p className=' font-medium'>{username} {
                            isFollow ? (
                                <button onClick={addFollower} className='btn btn-sm btn-primary'>Unfollow</button>
                            ) : (
                                <button onClick={addFollower} className='btn btn-sm btn-primary'>Follow</button>
                            )
                        }</p>
                        <p className='text-gray-800 font-extralight text-sm'>{format(createdAt)}</p>
                    </div>
                    <div className='badge my-auto badge-primary'>{postType}</div>
                </div>
                <div className='dropdown dropdown-left'>
                    <div tabIndex={0} role="button" className="btn shadow-none border-none rounded-full bg-transparent m-1"><span className=''><FaEllipsis /></span></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>This is option 1</a></li>
                        <li><a>This is option 2</a></li>
                    </ul>
                </div>
            </header>
            <div className='px-4 my-2 text-sm sm:text-lg'>{caption}</div>
            <Splide options={{ arrows: attachments.length > 1 ? true : false }} className='my-4' aria-label="My Favorite Images">
                {
                    attachments.map((attachment, index) => {
                        return (
                            <SplideSlide>
                                <img className='slider-img rounded-2xl' key={index} src={attachment.url} alt="post" />
                            </SplideSlide>
                        )
                    })
                }
            </Splide>
            <div className='flex items-center justify-evenly py-2'>
                <button onClick={handleLike} className='btn border-none shadow-none bg-transparent text-center text-md cursor-pointer hover:text-gray-400 sm:text-lg'>
                    <FaThumbsUp />
                    <p>Like</p>
                    <p>({likes.length})</p>
                </button>
                <button className="btn border-none shadow-none bg-transparent" onClick={() => document.getElementById(`modal_${postId}`).showModal()}><FaMessage />
                    <p>Comments</p>
                    <p></p>
                </button>
                <dialog id={`modal_${postId}`} className="modal">
                    <PostModal totalLikes={totalLikes} handleLike={handleLike} postId={postId} />
                </dialog>
                <button className='btn border-none shadow-none bg-transparent text-center text-md cursor-pointer hover:text-gray-400 sm:text-lg'>
                    <FaShare />
                    <p>Share</p>
                    <p></p>
                </button>
            </div>
        </div >
    )
}

export default Post