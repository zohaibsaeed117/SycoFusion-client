"use client";
import Post from '@/components/Post'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home({ params }) {
  const { username } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [isNewLoading, setIsNewLoading] = useState(true);

  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);
  const [allPosts, setAllPosts] = useState([]);
  const [isMore, setIsMore] = useState(true)
  const [page, setPage] = useState(1)



  const fetchProjects = async () => {


    await fetch(`/api/users/user-feed-posts-infinite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page: page, username: username })
    })
      .then(res => res.json())
      .then(data => {
        setTotalPosts(data.allPostsLength)
        let len = (data.posts).length;
        setCurrentPosts(currentPosts + len)

        setAllPosts((prevPosts) => [...prevPosts, ...data.posts])

        if (allPosts.length == totalPosts) {
          setIsMore(false)
        }
        else {
          setIsMore(true)
        }
        setPage(page + 1);

        setIsLoading(false)

      })



  }

  useEffect(() => {
    fetchProjects();
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className='text-4xl p-10 text-center font-bold my-10'>Posts by {username}</h1>

      <div className='flex justify-center items-center flex-col'>
        {
          allPosts.map((project, index) => {
            return <Post key={project._id + index} postId={project._id} createdAt={project.createdAt} username={project.username} caption={project.caption} likes={project.likes} postType={project.postType} attachments={project.attachments} />

          })
        }
      </div>

      {
        isLoading ? (
          <span className="loading loading-ring loading-lg"></span>
        ) : null
      }
      {
        isLoading == false && isMore ? (
          <div className='flex justify-center items-center'>
            <button className='my-10 btn redBtn btn-primary' onClick={fetchProjects}>Load More...</button>
          </div>
        ) : null
      }



      {
        isLoading == false && isMore == false ? (
          <h1 className='my-10 text-center font-bold'>You have seen all posts 👏</h1>
        ) : null
      }
    </div>
  )
}