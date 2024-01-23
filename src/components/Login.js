import React from 'react'

const Login = () => {
    return (
        <div className='flex flex-col gap-y-8 h-[100vh] justify-center items-center'>
            <h1 className="text-4xl font-semibold">Login to your account</h1>
            <input type="email" className="input input-bordered input-success w-full max-w-[20rem]" id="email" placeholder='Enter your name' />
            <input type="password" className="input input-bordered input-success w-full max-w-[20rem]" id="password" placeholder='Enter your Password' />
            <a href="/error" className='underline'>Forgot Your Password</a>
            <button className="btn btn-active btn-success text-xl text-white">Login</button>
        </div>
    )
}

export default Login

