// For user in profile view like /profiles/psycho
"use client"
import React, { useEffect, useState } from 'react'

import ProfileViewPropCard from './ProfileViewPropCard'
import {useUserStore} from '@/store/store';
function ProfileView({username, name, followers, following, posts, fullName}) {

  const { Username } = useUserStore();

 

  
  
  return (
    <>
    <div  style={{
      display: "block",
      width: "75%",
      margin: "auto",
      background: "rgba( 255, 255, 255, 0.45 )",
boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
backdropFilter: "blur( 10px )",
webkitBackdropFilter: "blur( 10px )",
borderRadius: "10px",
border: "1px solid rgba( 255, 255, 255, 0.18 )",
boxShadow: "0px 0px 70px 0px rgba(255,255,255,0.7)"
      // backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),url('https://i.pinimg.com/564x/55/0a/bf/550abf4f442868f3e257571268dd4ceb.jpg')",
    }} className='border'>
    <div className="flex justify-center items-center p-3 my-10 card sm:flex-col md:flex-row">
    <figure className='ring-error'>
   
  

        <img style={{
            borderRadius: "50%",
            width: "200px",
            height: "200px"
          }} src={`https://ui-avatars.com/api/?name=${Username}`} className='ring ring-error '/>
 
     
    </figure>
    <div className="text-black card-body">
      <div className='flex justify-center items-center flex-col'>
      <div className='flex justify-around items-center'>
      <h2 style={{
        fontSize: "2rem"
      }} className="card-title">{fullName}</h2>
     
      </div>
      
      <h2 className="my-3 card-title md:my-0">@{Username}</h2>
    
      <div className='my-5 flex justify-evenly flex-col md:flex-row'>
      <ProfileViewPropCard name={"Followers"} count={followers}/>
      <ProfileViewPropCard name={"Following"} count={following}/>
      <ProfileViewPropCard name={"Posts"} count={posts}/>
      </div>
      </div>
      
   
    </div>


    
  </div>


  </div>

 
  </>
  )

}

export default ProfileView