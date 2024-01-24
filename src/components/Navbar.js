"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUserStore } from "../store/store";
import { ToastContainer, toast } from "react-toastify";
import { FaCirclePlus } from "react-icons/fa6";
var jwt = require("jsonwebtoken");
import "react-toastify/dist/ReactToastify.css";

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
  } = useUserStore();

  const tokenVerification = async () => {
    let key = process.env.NEXT_PUBLIC_JWT_TOKEN;

    var token = localStorage.getItem("sycofusion_token");
    if (token != null) {
      var verification = await jwt.decode(token, key);
      console.log(verification)

      if (verification != null) {
        setIsLogin(true);
        setUsername(verification.username);
        setFirstName(verification.firstName);
        setLastName(verification.lastName);
        setAvatar(verification.avatar);
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
      <div>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href={"/"}>Home</Link>
                </li>
                <li>
                  <Link href={"/posts"}>Feed</Link>
                </li>

                <li>
                  <Link href={"/about"}>About</Link>
                </li>

                <li>
                  <Link href={"/contact"}>Contact</Link>
                </li>
              </ul>
            </div>
            <Link href={"/"} className="btn btn-ghost text-xl">
              <Image width={50} height={50} src={"/logo.png"} />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/posts"}>Feed</Link>
              </li>

              <li>
                <Link href={"/about"}>About</Link>
              </li>

              <li>
                <Link href={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
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
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      />
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
                      <a>Settings</a>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
