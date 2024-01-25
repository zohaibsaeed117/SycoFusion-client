"use client"
import React, {useState} from 'react'
import ProfileView from '@/components/ProfileView';
import Link from 'next/link';
import { useUserStore } from '@/store/store';
import {AiFillGithub} from "react-icons/ai";
import {BsTwitter} from "react-icons/bs";
import {BsLinkedin} from "react-icons/bs";
import {GrYoutube} from "react-icons/gr";
import {FaMedium} from "react-icons/fa";
function page({params}) {
    const {username} = params;
    const {Username} = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
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
         <ProfileView username={username} followers={100} following={2} posts={20}/>
          
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
     
      
        <div
        style={
          {
            marginTop: "20px",
            padding: "50px"
          }
        }
        className='flex justify-between items-center'>
        <h1 className='my-10 text-3xl font-bold'>Posts 📝</h1>
        <Link href={`/profiles/${username}/posts`}>Show All</Link>
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
        
            <a><AiFillGithub className='social-icon github'/></a>
          <a><BsTwitter className='social-icon twitter'/></a>
          <a><BsLinkedin className='social-icon linkedin'/></a>
          <a><GrYoutube className='social-icon youtube'/></a>
       
        
        </div>
    
    
     
    
         </>
         )
    
       }
          </div>
      )
}

export default page