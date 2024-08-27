"use client"
import React, { useEffect, useState } from 'react';
import { Camera, CameraIcon, Ellipsis, Heart, MessageCircle, MessageCircleMore, MessageCircleReply, MoveDown, Send, Share, Share2, Smile } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import CommentCard from './CommentCard'
import { format } from 'timeago.js';
import { FaEllipsis, FaMessage, FaShare, FaThumbsUp } from 'react-icons/fa6'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import PostModal from './PostModal'
import { useUserStore } from '@/store/store';
import ImageGrid from './ImgGrid';
import { Input } from './ui/input';
import { Button } from './ui/button';
const Post = ({ postId, createdAt, username, caption, likes, postType, attachments }) => {
    const { Username, UserId } = useUserStore();
    const [isFollow, setIsFollow] = useState(false);
    const { setIsAlert, setAlertMsg, setAlertType } = useUserStore();
    const [isLiked, setIsLiked] = useState(null);

    const [totalLikes, setTotalLikes] = useState(likes.length);
    const isAuthor = username === Username ? true : false


    const isLikePost = () => {
        const liked = likes.includes(Username);
        setIsLiked(liked);
    }

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
    const removeFollower = async () => {

        // finding logged in user id
        const response = await fetch(`/api/users/getUserId`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username })

        })
        const data = await response.json();
        const userId = data.user._id;


        const res = await fetch('/api/followers/unfollow-user', {
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


    const handleLike = () => {

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

                if (data.liked) {
                    setTotalLikes(totalLikes + 1)
                    setIsLiked(true);

                }
                else {
                    setTotalLikes(totalLikes - 1)
                    setIsLiked(false);
                }

            })
    }

    useEffect(() => {
        checkFollow();
        isLikePost();
    }, []);

    const images = [
        "/abc.jpg",
        "/abc.jpg",
        "/abc.jpg",
        "/abc.jpg",
        "/abc.jpg",
        "/abc.jpg"
    ]

    return (
        <div className='bg-card text-card-foreground border shadow-md border-border rounded-xl w-full max-w-[40rem] flex flex-col gap-y-4 p-4'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center justify-normal gap-x-5'>
                    <Image src={'/abc.jpg'} height={150} width={150} className='rounded-full h-14 w-14 object-fill' />
                    <div>
                        <h1 className='text-xl font-semibold'>{username}</h1>
                        <span className='font-light text-sm'>{format(createdAt)}</span>
                    </div>
                </div>
                <Ellipsis />
            </div>
            <p className='text-sm'>
                {
                    caption?.length > 200 ?
                        <>
                            {caption.slice(0, 200)}{"  "}
                            <Link href="#" className="italic font-semibold">See more</Link>
                        </>
                        : caption
                }
            </p>
            {/* <Image src="/bucket-3.jpg" height={1000} width={1000} className='object-cover max-h-96' /> */}
            <div>
                <ImageGrid images={images} />
            </div>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center gap-x-4'>
                    <button onClick={handleLike} className='flex items-center gap-x-2'>
                        <Heart className={`${isLiked ? 'text-red-500' : 'text-foreground hover:text-foreground/60'} transition-colors`} fill={isLiked ? "red" : "none"} />
                        <span className='text-sm'>{likes?.length || 0}</span>
                    </button>
                    <button className='flex items-center gap-x-2'>
                        <MessageCircleMore className='text-foreground hover:text-foreground/60 transition-colors' />
                        <span className='text-sm'>{likes?.length || 0}</span>
                    </button>
                    <button className='flex items-center gap-x-2'>
                        <Share2 className='text-foreground hover:text-foreground/60 transition-colors' />
                        <span className='text-sm'>{likes?.length || 0}</span>
                    </button>
                </div>
                <div className='w-full sm:w-1/2 flex items-center gap-x-2'>
                    <Input placeholder="Enter your Comment" />
                    <Button size="icon"><Send /></Button>
                </div>
            </div>
            {
                false && <>
                    <div className='w-full border border-gray-400 ' />
                    <div className='flex items-center justify-center flex-col gap-y-2'>
                        <CommentCard />
                        <CommentCard />
                    </div>
                    <div className='flex items-center justify-center'>
                        <span className='text-base font-medium'>View all Comments</span>
                        <MoveDown size={12} />
                    </div>
                </>
            }
        </div>

        // <div className='w-[85vw] max-w-[50rem] my-4 mx-auto shadow-lg rounded-xl'>
        //     <header className='grid items-center justify-between m-2 grid-cols-2 gap-3 sm:grid-cols-3'>

        //         <div className='flex gap-3 order-1'>
        //             <img src={`https://ui-avatars.com/api/?name=${Username}`} alt="profilepic" className=' h-12 w-12 object-cover rounded-full border border-red-800' />
        //             <div className='flex flex-col'>
        //                 <p className=' font-medium'>{username}</p>
        //                 <p className='text-gray-800 font-extralight text-[10px] sm:text-sm'>{format(createdAt)}</p>
        //             </div>
        //         </div>

        //         <div className='order-3 badge my-auto badge-primary badge-sm text-[0.5rem] sm:badge-lg sm:text-md sm:order-2 sm:ml-[-7rem]'>{postType}</div>

        //         <div className={`order-2 flex items-center justify-end sm:order-3`}>
        //             {
        //                 isFollow ? (
        //                     <button onClick={removeFollower} className='${isAuthor ? "hidden" : "flex"} btn btn-sm text-[0.5rem] btn-primary sm:text-lg'>Unfollow</button>
        //                 ) : (
        //                     <button onClick={addFollower} className={`${isAuthor ? "hidden" : "flex"} btn btn-sm text-[0.5rem] btn-primary sm:text-lg`}>Follow</button>
        //                 )
        //             }
        //             <div className='dropdown dropdown-left'>
        //                 <div tabIndex={0} role="button" className="btn shadow-none border-none rounded-full bg-transparent m-0 sm:m-1"><span className=''><FaEllipsis /></span></div>
        //                 <ul tabIndex={0} className="dropdown-content z-[1] menu p-0 shadow bg-base-100 rounded-box w-52">
        //                     <li><button>Copy Post URL</button></li>
        //                     {
        //                         username == Username ? (
        //                             <>
        //                                 <li><button>Edit</button></li>
        //                                 <li><button className='text-red-500'>Delete</button></li>
        //                             </>
        //                         ) : null
        //                     }
        //                 </ul>
        //             </div>
        //         </div>
        //     </header>
        //     <div className='px-4 my-2 text-sm sm:text-lg'>{caption}</div>
        //     <Splide options={{ arrows: attachments.length > 1 ? true : false }} className='my-4' aria-label="My Favorite Images">
        //         {
        //             attachments.map((attachment, index) => {
        //                 return (
        //                     <SplideSlide>
        //                         <img className='slider-img rounded-2xl' key={index} src={attachment.url} alt="post" />
        //                     </SplideSlide>
        //                 )
        //             })
        //         }
        //     </Splide>
        //     <div className='flex items-center justify-evenly py-2'>
        //         <button text onClick={handleLike} className={`btn border-none shadow-none bg-transparent text-center text-[0.6rem] cursor-pointer  sm:text-lg`}>
        //             <FaThumbsUp style={{
        //                 color: isLiked ? '#4a00ff' : ""
        //             }} />
        //             <p style={{
        //                 color: isLiked ? '#4a00ff' : ""
        //             }}>Like</p>
        //             <p style={{
        //                 color: isLiked ? '#4a00ff' : ""
        //             }}>({totalLikes})</p>
        //         </button>
        //         <a href={`/posts/${postId}`} className="btn border-none shadow-none bg-transparent text-center text-[0.6rem] cursor-pointer  sm:text-lg"><FaMessage />
        //             <p>Comments</p>
        //             <p></p>
        //         </a>
        //         <button className='btn border-none shadow-none bg-transparent text-center text-[0.6rem] cursor-pointer  sm:text-lg'>
        //             <FaShare />
        //             <p>Share</p>
        //             <p></p>
        //         </button>
        //     </div>
        // </div >
    )
}

export default Post