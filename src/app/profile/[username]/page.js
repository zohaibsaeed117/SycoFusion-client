"use client"
import React, {useEffect, useState} from 'react'
import ProfileView from '@/components/ProfileView';
import Link from 'next/link';
import { useUserStore } from '@/store/store';
import {AiFillGithub} from "react-icons/ai";
import {BsTwitter} from "react-icons/bs";
import {BsLinkedin} from "react-icons/bs";
import {GrYoutube} from "react-icons/gr";
import {FaMedium} from "react-icons/fa";
import Post from "@/components/Post";
function page({params}) {
    const {username} = params;
    const {Username} = useUserStore();
    const [userData, setUserData] = useState({});
    const [followers, setFollowers] = useState(0)
    const [fullName, setFullName] = useState("")
    const [following, setFollowing] = useState(0);
    const [posts, setPosts] = useState([]);
    const [skills, setSkills] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [github, setGithub] = useState("");
    const [twitter, setTwitter] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [youtube, setYoutube] = useState("");
  
    const getUserPosts = async() => {
      setIsLoading(true);
      await fetch(`/api/posts/getProfilePosts`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username: username})
      })
      .then(res => res.json())
      .then(data => {
        
        console.log(data)
        if (data.type == "success") {
          
          setPosts(data.posts)
          console.log(data)
          setIsLoading(false)
          
        }
      })
    }
    const getUserData = async() => {
     
      await fetch(`/api/users/getUserData`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username: username})
      })
      .then(res => res.json())
      .then(data => {
        
        console.log(data)
        if (data.type == "success") {
          setUserData(data.data);
          console.log(data.data);
          setFollowers(data.data.user.followers.length);
          const skills = data.data.user?.skills;
          const SkillsArr = skills.split(",");
          setSkills(SkillsArr);
          setFollowing(data.data.user.following.length);
          setFullName(data.data.user.firstName+ " " + data.data.user.lastName)
          setGithub(data.data.user.socialLinks[0]?.url);
          setTwitter(data.data.user.socialLinks[1]?.url);
          setLinkedin(data.data.user.socialLinks[2]?.url);
          setYoutube(data.data.user.socialLinks[3]?.url);
         setIsLoading(false)
        
        }
      })
      
    }


    useEffect(() => {
      getUserData();
      getUserPosts();
    }, [])
    
    return (
        <div>
       
       {isLoading?<center><span className="my-10 text-center loading loading-dots loading-lg"></span></center>: ""}
    
       {
         isLoading?"":(
         <>
         <h1 className='mx-10 text-center text-3xl font-bold'>
     {username}'s Profile View Page
       </h1>
    
    
       <div className='my-10 flex justify-around items-center'>
         <ProfileView username={username} fullName={fullName} followers={followers} following={following} posts={userData.posts}/>
          
       </div>
    
        <div
        style={
          {
            marginTop: "20px",
            padding: "50px"
          }
        }
        className='flex justify-between items-center'>
        <h1 style={{
          fontSize: "2rem"
        }} className='my-10 font-bold'>Skills 🛠</h1>
        <div className='flex justify-center items-center flex-col md:flex-row'>
         
        {/* <button onClick={threeDMapView} className='my-5 btn redOutlineBtn'>3D View</button>
        <button onClick={twoDMapView} className='btn redBtn sm:btn'>Simple View</button> */}
        </div>
        </div>
        <div className='ml-10'>
        {
           skills.map((skill, index) => {
            return <div key={index} className="mx-2 badge badge-primary">{skill}</div>
            })
          }
        </div>
      
        <div
        style={
          {
            marginTop: "20px",
            padding: "50px"
          }
        }
        className='flex justify-between items-center'>
        <h1 className='my-10 text-3xl font-bold'>Posts 📝</h1>
        <Link href={`/profile/${username}/posts`}>Show All</Link>
        </div>

        {

        }
    
    {
      isLoading==false&&posts.length==0?(
        <h1 className='text-center font-bold text-2xl'>No Posts to show</h1>
      ):null
    }
        <div className='flex justify-center items-center flex-col'>
        {
          posts.map((project, index) => {
            return       <Post key={project._id+index} postId={project._id} createdAt={project.createdAt} username={project.username} caption={project.caption} likes={project.likes} postType={project.postType} attachments={project.attachments}/>

          })
        }
      </div>
    
    
    
    
 
     
    
        <div
        style={
          {
            marginTop: "20px",
            padding: "50px"
          }
        }
        className='flex justify-between items-center'>
        <h1 className='my-10 text-3xl font-bold'>Connect ✉</h1>
        <div>
          {
            username == Username?<Link href={`/profiles/settings/portfolio`} className='mx-4 btn redBtn'>Edit</Link>:""
          }
        </div>
        </div>
    
       
    
        <div className='my-10 flex justify-around items-center text-5xl'>
        
            <a href={github} target='_blank'><AiFillGithub className='social-icon github'/></a>
          <a href={twitter} target='_blank'><BsTwitter className='social-icon twitter'/></a>
          <a href={linkedin} target='_blank'><BsLinkedin className='social-icon linkedin'/></a>
          <a href={youtube} target='_blank'><GrYoutube className='social-icon youtube'/></a>
       
        
        </div>
    
    
     
    
         </>
         )
    
       }
          </div>
      )
}

export default page