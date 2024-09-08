"use client";
import AddPost from '@/components/AddPost';
import Post from '@/components/Post'
import PostSkelton from '@/components/PostSkelton';
import Link from 'next/link';
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [posts, setPosts] = useState([])
  const [isMore, setIsMore] = useState(true)
  const [page, setPage] = useState(1)



  const fetchProjects = async () => {

    setIsLoading(true)
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/get-post-feed?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('sycofusion_token')}`
        }
      }).then(res => res.json())
      console.log("This is data", data)
      if (data.morePosts) {
        setPosts(post => [...post, ...data.posts])
        setIsMore(data.morePosts)
        setPage(page + 1);
      }
      else {
        setIsMore(data.morePosts)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }



  }

  useEffect(() => {
    fetchProjects();
  }, [])

  return (
    <>
      {/* <div className='flex justify-center items-center'>
        <Link href={"/posts"} className='btn btn-primary mx-2'>For You</Link>
        <Link href={"/posts/following"} className='btn btn-secondary'> Following</Link>

      </div> */}
      <div className="flex min-h-screen flex-col items-center justify-normal gap-y-4 mt-4">
        <AddPost />

        {
          isLoading ?
            <>
              <PostSkelton />
              <PostSkelton />
              <PostSkelton />
              <PostSkelton />
            </>
            : <div className='flex justify-center items-center flex-col gap-y-4'>
              {
                posts?.map((project, index) => {
                  return <Post key={project?._id + index} postId={project?._id} createdAt={project?.createdAt} username={project?.author?.username} caption={project?.caption} likes={project?.likes} postType={project?.postType} attachments={project?.attachments} postIsLiked={project.isLiked} comments={project?.comments} author={project?.author} />

                })
              }
            </div>
        }

        {
          isLoading ? (
            <span className="loading loading-ring loading-lg"></span>
          ) : null
        }
        {
          !isLoading && isMore ? (
            <div className='flex justify-center items-center'>
              <button className='my-10 btn redBtn btn-primary' onClick={fetchProjects}>Load More...</button>
            </div>
          ) : null
        }



        {
          !isLoading && !isMore ? (
            <h1 className='my-10 text-center font-bold'>You have seen all posts 👏</h1>
          ) : null
        }
      </div>
    </>
  )
}