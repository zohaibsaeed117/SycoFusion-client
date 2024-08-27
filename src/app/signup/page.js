"use client"
import Link from "next/link"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/store";

export default function () {

  const router = useRouter();

  const [loading, setLoading] = useState(false)

  const { setIsAlert, setAlertMsg, setAlertType, setIsLogin, setFirstName, setLastName, setUsername, setAvatar, Username } = useUserStore();
  const createAccount = () => {
    setLoading(true)

    fetch(`/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        setAlertMsg(data.message);
        setIsAlert(true);
        setAlertType(data.type);
        if (data.type == "success") {
          router.push("/login");
        }
      })
    setLoading(false)
  }

  const [user, setUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    age: 0,
    password: ""
  })

  const handleChange = (e) => {
    setUser(user => {
      return {
        ...user,
        [e.target.id]: e.target.value
      }
    })
  }

  return (
    // <Signup/>

    <div className="min-h-[85vh]">

      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="Max" onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Robinson" onChange={handleChange} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">User name</Label>
                <Input id="username" placeholder="its_max_123" onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" placeholder="Robinson" type="number" onChange={handleChange} required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" onChange={handleChange} />
            </div>
            <Button disabled={loading} type="submit" className="w-full" onClick={createAccount}>
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>

  )
}