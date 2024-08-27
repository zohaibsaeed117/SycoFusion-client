"use client"
import React, { useState } from 'react'
import { useUserStore } from '@/store/store';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

const Signup = () => {


    return (
        <div className='flex flex-col gap-y-8 h-[140vh] justify-center items-center'>
            <h1 className="text-4xl font-semibold">Create an account</h1>
            <label htmlFor="name" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your Username
                <input type="name" className="input input-bordered input-primary" id="username" placeholder='e.g. John' onChange={handleChange} />
            </label>
            <label htmlFor="name" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your First Name
                <input type="name" className="input input-bordered input-primary" id="firstName" placeholder='e.g. John' onChange={handleChange} />
            </label>
            <label htmlFor="name" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your Last Name
                <input type="name" className="input input-bordered input-primary" id="lastName" placeholder='e.g. Walker' onChange={handleChange} />
            </label>
            <label htmlFor="email" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your Email
                <input type="name" className="input input-bordered input-primary" id="email" placeholder='e.g. john@gmail.com' onChange={handleChange} />
            </label>
            <label htmlFor="DOB" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your Age
                <input type="number" className="input input-bordered input-primary" id="age" placeholder='Enter your Age' onChange={handleChange} />
            </label>
            <label htmlFor="password" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your Password
                <input type="password" className="input input-bordered input-primary" id="password" placeholder='Enter your Password' onChange={handleChange} />
            </label>
            <button onClick={createAccount} className="btn btn-active btn-primary text-xl text-white">Signup</button>
        </div>
    )
}

export default Signup

