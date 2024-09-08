"use client";
import { useUserStore } from '@/store/store';
import React, { useRef, useState, useEffect } from 'react'
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import OverlayLoading from '@/components/OverlayLoading';
import Loader from '@/components/Loader';
export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  const { setIsAlert, setAlertMsg, setAlertType } = useUserStore();

  const [userData, setUserData] = useState()

  const getProfile = async () => {
    setIsLoading(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('sycofusion_token')}`
        },
        mode: 'no-cors',
      }).then(res => res.json())

      if (response.success) {
        setUserData(response.user);
      }
      else {
        setIsAlert(true)
        setAlertMsg(response.message);
        setAlertType('error')
      }
    } catch (error) {
      setIsAlert(true)
      setAlertMsg(response.message);
      setAlertType('error')
    }
  }


  const handleEdit = async () => {
    setIsLoading(true);
    console.log("HEllo world")
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/edit-profile`, {
        method: "PUT",
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('sycofusion_token')}`
        },
        body: JSON.stringify({ user: userData })
      }).then(res => res.json())


      if (response.success) {
        setIsAlert(true)
        setAlertMsg(response.message);
        setAlertType('success')
      }
      else {
        setIsAlert(true)
        setAlertMsg(response.message);
        setAlertType('error')
      }
    } catch (error) {
      setIsAlert(true)
      setAlertType(error.type)
      setAlertMsg(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])
  return isLoading ? <Loader /> : (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <Card
          className="max-w-xl mx-auto p-6 espace-y-6 relative ">
          {isLoading && <OverlayLoading />}
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Firstname */}
            <div>
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                placeholder="First Name"
                value={userData?.firstName}
                onChange={e => setUserData(user => {
                  return {
                    ...user,
                    firstName: e.target.value
                  }
                })} />
            </div>

            {/* Lastname */}
            <div>
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                placeholder="Last Name"
                value={userData?.lastName}
                onChange={e => setUserData(user => {
                  return {
                    ...user,
                    lastName: e.target.value
                  }
                })}
              />
            </div>
            {/* Username */}
            <div className="col-span-1 md:col-span-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Username"
                value={userData?.username}
                onChange={e => setUserData(user => {
                  return {
                    ...user,
                    username: e.target.value
                  }
                })}
              />
            </div>

            {/* Email */}
            <div className="col-span-1 md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={userData?.email}
                onChange={e => setUserData(user => {
                  return {
                    ...user,
                    email: e.target.value
                  }
                })}
              />
            </div>

            {/* Social Links */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label>Social Links</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    placeholder="GitHub URL"
                    value={userData?.socialLinks?.github}
                    onChange={e => setUserData(user => {
                      return {
                        ...user,
                        socialLinks: {
                          ...user.socialLinks,
                          github: e.target.value
                        }
                      }
                    })}
                  />

                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="LinkedIn URL"
                    value={userData?.socialLinks?.linkedin}
                    onChange={e => setUserData(user => {
                      return {
                        ...user,
                        socialLinks: {
                          ...user.socialLinks,
                          linkedin: e.target.value
                        }
                      }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="Instagram URL"
                    value={userData?.socialLinks?.instagram}
                    onChange={e => setUserData(user => {
                      return {
                        ...user,
                        socialLinks: {
                          ...user.socialLinks,
                          instagram: e.target.value
                        }
                      }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    placeholder="Facebook URL"
                    value={userData?.socialLinks?.facebook}
                    onChange={e => setUserData(user => {
                      return {
                        ...user,
                        socialLinks: {
                          ...user.socialLinks,
                          facebook: e.target.value
                        }
                      }
                    })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </CardFooter>
        </Card>
      </main>
    </div >
  );
}
