"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUserStore } from "../store/store";
import { ToastContainer, toast } from "react-toastify";
import { FaCirclePlus } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { Menu, Router, SeparatorHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import ResponsiveNavDrawer from "./ResponsiveNavDrawer";
import { GiHamburgerMenu } from "react-icons/gi";
import { AvatarDropDown } from "./AvatarDropDown";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter()
  const {
    isAlert,
    alertMsg,
    alertType,
    setIsAlert,
    setAlertMsg,
    setAlertType,
    setIsLogin,
    isLogin,
    user,
    setUser,
  } = useUserStore();

  const [isOpen, setIsOpen] = useState(false)

  const tokenVerification = async () => {
    var token = localStorage.getItem("sycofusion_token");
    var user = JSON.parse(localStorage.getItem("sycofusion_user"));
    console.log("User set", user)
    if (token || user) {
      setUser(user);
      setIsLogin(true)
    }
    else {
      router.push('login')

    }
  };

  const logout = () => {
    localStorage.removeItem("sycofusion_token");
    setIsLogin(false);
    setUser({})
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
                  <AvatarDropDown logout={logout} userName={user?.username} />
                </> :
                <div className="flex gap-x-4">
                  <Button asChild><Link href="/login">Login</Link></Button>
                  <Button variant="secondary" asChild><Link href="/signup">Signup</Link></Button>
                </div>
            }
          </div>
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
