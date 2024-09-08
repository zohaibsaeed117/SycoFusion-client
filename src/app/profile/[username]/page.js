"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Camera, FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon, PencilOff, Settings2, TwitterIcon, } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import Post from '@/components/Post'
import Loader from "@/components/Loader"
import { useUserStore } from '@/store/store'
import ProfileModal from '@/components/ProfileModal'
import Link from 'next/link'
import CoverModal from '@/components/CoverModal'
function page({ params }) {
  const { username } = params

  const { setIsAlert, setAlertMsg, setAlertType, user } = useUserStore()


  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUser] = useState({})
  const [isOurProfile, setIsOurProfile] = useState(false)
  const getUserData = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('sycofusion_token')}`
          }
        }
      )
        .then(res => res.json())

      console.log(response)

      if (response.success) {
        setUser(response.user)
        setIsOurProfile(response.isOurProfile)
      }
      else {
        setIsAlert(true)
        setAlertType("error")
        setAlertMsg(response.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  function validateAndNormalizeUrl(url) {
    // Trim any leading or trailing spaces
    url = url.trim();

    // Check if the URL already starts with http:// or https://
    if (!/^https?:\/\//i.test(url)) {
      // If not, prepend https:// to the URL
      url = 'https://' + url;
    }

    // Return the normalized URL
    return url;
  }
  useEffect(() => {
    getUserData();
  }, [])
  return (
    <>
      {isLoading ? <Loader /> :
        <div className='min-h-[90vh]'>
          <div className='w-full md:w-[80vw] border mx-auto rounded-3xl'>
            <div className='relative'>
              <Image src={user?.cover || "/no-img.png"} alt={`${username}'s Cover Picture`} height={400} width={1584} className='w-full object-contain object-center bg-accent max-h-60 ' />
              {isOurProfile && <CoverModal />}
            </div>
            <div className='flex items-center justify-between flex-col md:flex-row gap-y-4'>
              <div className='flex items-start md:ml-10 justify-center flex-col'>
                <Avatar className="relative z-0 h-28 w-28 md:h-40 md:w-40 md:-mt-20 -mt-10 border-4 border-background overflow-visible">
                  <AvatarImage src={userData?.avatar} className="rounded-full object-top" />
                  <AvatarFallback className="text-5xl">ZS</AvatarFallback>
                  {isOurProfile && <ProfileModal />}
                </Avatar>
                <div className='flex items-center justify-center flex-col'>
                  <h1 className='text-xl font-semibold'>{userData?.firstName + " " + userData?.lastName}</h1>
                  <span className='text-base font-light '>{userData?.username}</span>
                </div>
              </div>
              <div className='flex gap-x-3 mx-auto'>
                <p className='flex items-center jusify-center flex-col bg-secondary text-secondary-foreground p-2 md:p-4 rounded-2xl'>
                  <span className='text-base md:text-xl'>Followers</span>
                  <span>{userData?.followers?.length}</span>
                </p>
                <p className='flex items-center jusify-center flex-col bg-secondary text-secondary-foreground p-2 md:p-4 rounded-2xl'>
                  <span className='text-base md:text-xl'>Posts</span>
                  <span>{userData?.posts?.length}</span>
                </p>
                <p className='flex items-center jusify-center flex-col bg-secondary text-secondary-foreground p-2 md:p-4 rounded-2xl'>
                  <span className='text-base md:text-xl'>Following</span>
                  <span>{userData?.following?.length}</span>
                </p>
              </div>
              <div className='flex items-center justify-center gap-x-4 md:mr-10 mx-auto'>
                {

                  userData?.socialLinks?.linkedin && <Link href={validateAndNormalizeUrl(userData?.socialLinks?.linkedin)} target='_blank' className={`${buttonVariants({ variant: "ghost", size: "icon" })} hover:text-blue-600}`}><LinkedinIcon /></Link>
                }
                {

                  userData?.socialLinks?.instagram && <Link href={validateAndNormalizeUrl(userData?.socialLinks?.instagram)} target='_blank' className={buttonVariants({ variant: "ghost", size: "icon" }) + "hover:text-pink-700"}><InstagramIcon /></Link>
                }
                {

                  userData?.socialLinks?.facebook && <Link href={validateAndNormalizeUrl(userData?.socialLinks?.facebook)} target='_blank' className={buttonVariants({ variant: "ghost", size: "icon" }) + "hover:text-blue-900"}><FacebookIcon /></Link>
                }
                {

                  userData?.socialLinks?.github && <Link href={validateAndNormalizeUrl(userData?.socialLinks?.github)} target='_blank' className={buttonVariants({ variant: "ghost", size: "icon" }) + "hover:text-gray-600"}><GithubIcon /></Link>
                }
                {

                  userData?.socialLinks?.twitter && <Link href={validateAndNormalizeUrl(userData?.socialLinks?.twitter)} target='_blank' className={buttonVariants({ variant: "ghost", size: "icon" }) + "hover:text-sky-600"}><TwitterIcon /></Link>
                }
              </div>
            </div>
          </div>

          <div className='flex items-center justify-center flex-col gap-y-6 mt-4'>
            {userData?.posts?.map((project, index) => <Post key={project?._id + index} postId={project?._id} createdAt={project?.createdAt} username={userData.username} caption={project?.caption} likes={project?.likes} postType={project?.postType} attachments={project?.attachments} postIsLiked={project.isLiked} comments={project?.comments} />)}
          </div>

        </div >}
    </>
  )
}

export default page