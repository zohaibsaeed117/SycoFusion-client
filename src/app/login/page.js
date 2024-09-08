"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useUserStore } from '@/store/store';

export default function () {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false)
  const router = useRouter();

  const { setIsAlert, setAlertMsg, setAlertType, setIsLogin, setUser } = useUserStore();


  const login = () => {
    const data = {
      "username": username,
      "password": password
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAlertType('success');
          setIsAlert(true);
          setAlertMsg(data.message);
          setIsLogin(true)
          setUser(data.user)
          console.log("Setting user to local", data.user)
          localStorage.setItem("sycofusion_user", JSON.stringify(data.user))
          localStorage.setItem("sycofusion_token", data.token);
          router.push("/posts");
        }
        else {
          setAlertType('error');
          setIsAlert(true);
          setAlertMsg(data.message);
        }


      })
  }
  return (
    <div className="min-h-[85vh] flex items-center justify-center">

      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">username</Label>
            <Input id="username" type="text" placeholder="max_123" value={username} onChange={e => setusername(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={login} disabled={isLoading}>{isLoading ? <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
          </svg> : "Sign in"}</Button>
        </CardFooter>
      </Card>
    </div>

  )
}
