"use client"
import React, { useState } from 'react'

const Signup = () => {


    const [user, setUser] = useState({
        name: "",
        email: "",
        DOB: "",
        password: ""
    })

    console.log(user)
    const handleChange = (e) => {
        setUser(user => {
            return {
                ...user,
                [e.target.id]: e.target.value
            }
        })
    }


    return (
        <div className='flex flex-col gap-y-8 h-[100vh] justify-center items-center'>
            <h1 className="text-4xl font-semibold">Create an account</h1>
            <label htmlFor="name" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your Name
                <input type="name" className="input input-bordered input-success" id="name" placeholder='e.g. John Walker' onChange={handleChange} />
            </label>
            <label htmlFor="email" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your Email
                <input type="name" className="input input-bordered input-success" id="email" placeholder='e.g. john@gmail.com' onChange={handleChange} />
            </label>
            <label htmlFor="DOB" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your DOB
                <input type="date" className="input input-bordered input-success" id="DOB" placeholder='Enter your Name' onChange={handleChange} />
            </label>
            <label htmlFor="password" className='flex flex-col gap-y-2 w-[20rem]'>
                Enter Your Password
                <input type="password" className="input input-bordered input-success" id="name" placeholder='Enter your Password' onChange={handleChange} />
            </label>
            <button className="btn btn-active btn-success text-xl text-white">Signup</button>
        </div>
    )
}

export default Signup

