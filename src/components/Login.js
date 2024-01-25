"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useUserStore } from '@/store/store';
const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { setIsAlert, setAlertMsg, setAlertType, setIsLogin, setFirstName, setLastName, setUsername, setAvatar, Username, setUserId } = useUserStore();


  const login = () => {
    const data = {
      "username": username,
      "password": password
    }
    fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setAlertMsg(data.message);
        setIsAlert(true);
        setAlertType(data.type);
        console.log(data)
        if (data.type == "success") {
          setIsLogin(true)
          setFirstName(data.firstName)
          setLastName(data.lastName)
          setAvatar(data.avatar)
          setUsername(data.username)
          setUserId(data.userId)
          localStorage.setItem("sycofusion_token", data.token);
          console.log(`User: ${data.username} - ${Username}`)
        }


      })
  }
  return (
    <div className="flex flex-col gap-y-8 h-[100vh] justify-center items-center">
      <h1 className="text-4xl font-semibold">Login to your account</h1>
      <input
        type="username"
        value={username}
        onChange={e => setusername(e.target.value)}
        className="input input-bordered input-primary w-full max-w-[20rem]"
        id="email"
        placeholder="Enter your username"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="input input-bordered input-primary w-full max-w-[20rem]"
        id="password"
        placeholder="Enter your Password"
      />
      <a href="/error" className="underline">
        Forgot Your Password
      </a>
      <button onClick={login} className="btn btn-active btn-primary text-xl text-white">
        Login
      </button>
    </div>
  );
};

export default Login;
