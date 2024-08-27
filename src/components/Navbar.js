"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUserStore } from "../store/store";
import { ToastContainer, toast } from "react-toastify";
import { FaCirclePlus } from "react-icons/fa6";
var jwt = require("jsonwebtoken");
import "react-toastify/dist/ReactToastify.css";
import { Menu, SeparatorHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import ResponsiveNavDrawer from "./ResponsiveNavDrawer";
import { GiHamburgerMenu } from "react-icons/gi";
import { AvatarDropDown } from "./AvatarDropDown";
const Navbar = () => {
  const {
    isAlert,
    alertMsg,
    alertType,
    setIsAlert,
    setAlertMsg,
    Username,
    setAlertType,
    setIsLogin,
    isLogin,
    setUsername,
    setFirstName,
    setLastName,
    setAvatar,
    setUserId,
    UserId
  } = useUserStore();

  const [isOpen, setIsOpen] = useState(false)

  const tokenVerification = async () => {
    let key = process.env.NEXT_PUBLIC_JWT_TOKEN;

    var token = localStorage.getItem("sycofusion_token");
    if (token != null) {
      var verification = await jwt.decode(token, key);

      if (verification != null) {
        setIsLogin(true);
        setUsername(verification.username);
        setFirstName(verification.firstName);
        setLastName(verification.lastName);
        setAvatar(verification.avatar);
        setUserId(verification.userId)
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("sycofusion_token");
    setIsLogin(false);
    setUsername("");
    setFirstName("");
    setLastName("");
    setAvatar("");
    setIsAlert(true);
    setAlertMsg("Logged out successfully.");
    setAlertType("success");
  };

  useEffect(() => {
    tokenVerification();
  }, []);

  useEffect(() => {
    if (isAlert) {
      if (alertType == "success") {
        toast.success(alertMsg, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (alertType == "error") {
        toast.error(alertMsg, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      setIsAlert(false);
    }
  }, [isAlert]);
  return (
    <>
      <ToastContainer
        style={{
          zIndex: 100
        }}
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className='bg-background text-foreground flex w-full justify-between font-roboto shadow-md'>
        <Link href={"/"} className="ml-4">
          <Image width={60} height={60} src={"/logo.png"} />
        </Link>
        <nav className='hidden justify-end w-[70%] lg:flex'>
          <ul className='flex text-secondary-200 items-center justify-between lg:py-4 gap-x-4'>
            <li><a className="hover:text-foreground/60 transition-colors" href="/">Home</a></li>
            <li><a className="hover:text-foreground/60 transition-colors" href="/posts">Feed</a></li>
            <li><a className="hover:text-foreground/60 transition-colors" href="/about">About</a></li>
            <li><a className="hover:text-foreground/60 transition-colors" href="/contact">Contact</a></li>
            <SeparatorHorizontal orientation="vertical" className="w-[2px] bg-muted-foreground" />
          </ul>
          <div className="flex items-center justify-center mx-4">
            {
              isLogin
                ? <>
                  <AvatarDropDown logout={logout} userName={Username} />
                </> :
                <div className="flex gap-x-4">
                  <Button asChild><Link href="/login">Login</Link></Button>
                  <Button variant="secondary" asChild><Link href="/signup">Signup</Link></Button>
                </div>
            }
          </div>
          {/* <div className='flex items-center justify-center gap-x-2 mx-2'>
            {isLogin ? (
              <>
                <Link href={"/posts/add-post"}><FaCirclePlus className="icon mx-5 text-4xl text-red-500" /></Link>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img src={`https://ui-avatars.com/api/?name=${Username}`} alt="profilepic" className=' h-12 w-12 object-cover rounded-full border border-red-800' />

                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a className="justify-between">Welcome, {Username}</a>
                    </li>
                    <li>
                      <Link href={`/profile/${Username}`}>My Profile</Link>
                    </li>
                    <li>
                      <Link href={`/profile/settings`}>Settings</Link>
                    </li>
                    <li>
                      <a onClick={logout}>Logout</a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link href={"/login"} className="btn btn-primary">
                  Login
                </Link>
                <Link href={"/signup"} className="mx-2 btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div> */}
        </nav>
        <div className='lg:hidden'>
          <Button asChild variant="ghost" size="icon" className='m-4 block lg:hidden' onClick={() => setIsOpen(!isOpen)}>
            <Menu />
          </Button>
          <ResponsiveNavDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
