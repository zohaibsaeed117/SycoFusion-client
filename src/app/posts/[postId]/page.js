"use client";
import React, { useEffect, useState } from 'react';
import { Ellipsis, Heart, MessageCircleMore, MoveDown, Send, Share2 } from 'lucide-react'
import Link from 'next/link'
import CommentCard from '@/components/CommentCard';
import { format } from 'timeago.js';
import { useUserStore } from '@/store/store';
import ImageGrid from '@/components/ImgGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Loader from '@/components/Loader';
export default function Home({ params }) {
  const { setIsAlert, setAlertMsg, setAlertType } = useUserStore();
  const { postId } = params;


  const [isLiked, setIsLiked] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [likesCount, setLikesCount] = useState(0)
  const [commentMessage, setCommentMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const getPost = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`, {
        method: "GET",
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('sycofusion_token')}`
        }
      }
      ).then(res => res.json())
      console.log(response)
      if (response.success) {
        setPostContent(response.post);
        setLikesCount(response.post?.likes?.length);
        setIsLiked(response?.post?.isLiked)
      }
      else {
        setIsAlert(true)
        setAlertType("error");
        setAlertMsg(response.message);
      }


    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      console.log(postContent)

    }


  }
  const handleLike = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/like`, {
        method: "POST",
        mode: 'no-cors',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('sycofusion_token')}`,
          'Content-Type': "application/json",
        },
        body: JSON.stringify({ postId: postId })
      }).then(res => res.json());

      if (response.success) {

        setIsLiked(!isLiked);
        setLikesCount(like => !isLiked ? like + 1 : like - 1);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleComment = async () => {
    if (commentMessage === "") {
      setIsAlert(true)
      setAlertType("error");
      setAlertMsg("Please enter a comment");
      return
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/add-comment`, {
        method: "POST",
        mode: 'no-cors',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("sycofusion_token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: commentMessage, postId: postId })
      }).then(res => res.json());
      console.log(response)

      if (response.success) {
        setCommentMessage("")
        setAlertType("success");
        setIsAlert(true);
        setAlertMsg(response.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getPost();
  }, [])

  return (
    <>
      {
        isLoading ? <Loader /> :
          <div className='bg-card text-card-foreground border shadow-md border-border rounded-xl flex flex-col gap-y-4 p-4 w-64 md:w-[40rem] mx-auto mt-4'>
            <div className='w-full flex items-center justify-between'>
              <div className='flex items-center justify-normal gap-x-5'>
                <Avatar className="w-10 lg:w-12  h-10 lg:h-12 ">
                  <AvatarImage src="https://github.com/zohaibsaeed117.png" />
                  <AvatarFallback>ZS</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className='text-sm font-semibold md:text-xl'>{postContent?.author?.username}</h1>
                  <span className='font-light text-[10px] md:text-sm'>{format(postContent.createdAt)}</span>
                </div>
              </div>
              <Ellipsis />
            </div>
            <p className='text-sm'>
              {
                postContent.caption?.length > 200 ?
                  <>
                    {postContent.caption.slice(0, 200)}{"  "}
                    <Link href="#" className="italic font-semibold">See more</Link>
                  </>
                  : postContent.caption
              }
            </p>
            <div>
              {postContent.attachments && <ImageGrid images={postContent.attachments} />}
            </div>
            <div className='w-full flex items-start md:items-center justify-between flex-col md:flex-row gap-y-4'>
              <div className='flex items-center max-md:justify-between w-full gap-x-4'>
                <button onClick={handleLike} className='flex items-center gap-x-2'>
                  <Heart className={`${isLiked ? 'text-red-500' : 'text-foreground hover:text-foreground/60'} transition-colors`} fill={isLiked ? "red" : "none"} />
                  <span className='text-sm'>{likesCount || 0}</span>
                </button>
                <button className='flex items-center gap-x-2'>
                  <MessageCircleMore className='text-foreground hover:text-foreground/60 transition-colors' />
                  <span className='text-sm'>{postContent?.comments?.length || 0}</span>
                </button>
                {/* <button className='flex items-center gap-x-2'>
                  <Share2 className='text-foreground hover:text-foreground/60 transition-colors' />
                  <span className='text-sm'>{likes?.length || 0}</span>
                </button> */}
              </div>
              <div className='w-full sm:w-1/2 flex items-center gap-x-2'>
                <Input placeholder="Enter your Comment" value={commentMessage} onChange={(e) => setCommentMessage(e.target.value)} />
                <Button size="icon" onClick={handleComment}><Send /></Button>
              </div>
            </div>
            {
              postContent?.comments?.length !== 0 &&
              <>
                <div className='w-full border border-gray-400 ' />
                <div className='flex items-start justify-center flex-col gap-y-2'>
                  {postContent.comments?.map(comment => <CommentCard key={comment._id} message={comment.message} author={comment?.author} />
                  )}
                </div>
              </>
            }
          </div>
      }
    </>
  )
}
