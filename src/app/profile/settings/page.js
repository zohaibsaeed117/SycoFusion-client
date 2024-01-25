"use client";
import Link from "next/link";
import { useUserStore } from "@/store/store";
var jwt = require("jsonwebtoken");
import "@/css/globals.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebaseStorage";
import { useEffect, useState, useRef } from "react";

import { AiOutlineUser } from "react-icons/ai";
import { BsSun } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { useRouter } from "next/navigation";

export default function Home({ params }) {
  const { user } = params;
  const {
    isAlert,
    alertMsg,
    alertType,
    setIsAlert,
    setAlertMsg,
    setAlertType,
    setTheme,
    setIsLogin,
    isLogin,
    setFirstName,
    setLastName,
    Username,
    setUsername,
    setAvatar,
  } = useUserStore();

  const router = useRouter();

  const checkIsAccountLogin = async () => {
    let key = process.env.NEXT_PUBLIC_JWT_TOKEN;
    // console.log(`JWT TOKEN: ${key}`)
    var token = localStorage.getItem("sycofusion_token");
    if (token != null) {
      var verification = await jwt.decode(token, key);
      // console.log(verification)

      if (verification == null) {
        router.push("/login");
      }
    }
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("G");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [Avatar, SetAvatar] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");


  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const data = {
      username: Username,
    };
    const response = await fetch(`/api/users/getUserData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    setUserData(responseData.data.user);
    console.log(responseData.data.user);

    console.log(responseData.data.user?.firstName);
    SetFirstName(responseData.data.user?.firstName);
    SetLastName(responseData.data.user?.lastName);
    setEmail(responseData.data.user?.email);
    setAge(responseData.data.user?.age);
    setRole(responseData.data.user?.role);
    setSkills(responseData.data.user?.skills);
    setGithub(responseData.data.user?.socialLinks[0]?.url)
    setTwitter(responseData.data.user?.socialLinks[1]?.url)
    setLinkedin(responseData.data.user?.socialLinks[2]?.url)
    setYoutube(responseData.data.user?.socialLinks[3]?.url)
  };
  const updateProfile = async () => {
    const socialLinks = [
      {name: "github", url: github},
      {name: "twitter", url: twitter},
      {name: "linkedin", url: linkedin},
      {name: "youtube", url: youtube}
    ]
    const data = {
      username: Username,
      firstName: firstName,
      lastName: lastName,
      avatar: Avatar,
      email: email,
      skills: skills,
      age: age,
      role: role,
      socialLinks: socialLinks
    };
    await fetch(`/api/users/updateProfileData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAlert(true);
        setAlertType(data.type);
        setAlertMsg(data.message);
        if (data.type == "success") {
          var succ = localStorage.setItem("token", data.token);
          console.log(succ);

          var verification = jwt.decode(
            data.token,
            process.env.NEXT_PUBLIC_JWT_TOKEN
          );
          console.log(verification);
        }
        setFirstName(firstName);
        setLastName(lastName);
        setAvatar(Avatar);
        getUserData();
      });
  };
  const handleUploadFile = async (file) => {
    console.log(`File: ${file}`);
    if (file) {
      // setUploadProgressCaption("Uploading...")
      const name = file.name;
      const storageRef = ref(storage, `dp/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setDownloadURL(url);
            SetAvatar(url);
            console.log(url);
          });
        }
      );
    } else {
      console.error("File not found");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(`Selected: ${file}`);
    if (file) {
      console.log(file);
      setSelectedFile(file);
      console.log("Selected file:", file.name);
    }

    if (file && file.size < 5000000) {
      console.log(file);
      setSelectedFile(file);
      await handleUploadFile(file);
    } else {
      console.error("File size to large");
    }
  };

  const runFunctions = async () => {
    const res = await getUserData();
  };

  useEffect(() => {
    checkIsAccountLogin();
    runFunctions();
  }, []);

  return (
    <>
      <div
        style={{
          width: "90vw",
        }}
        className="ml-5 bg-gray-800 flex justify-between flex-col md:flex-row"
      >
        <div
          style={{
            width: "90vw",
          }}
          className="bg-gray-700"
        >
          <h1 className="text-center my-10 text-white font-bold text-3xl">
            Profile Settings
          </h1>
          <div className="flex justify-center items-center">
            <div>
              <input
                type="file"
                accept=".jpg,.png"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              <label>
                <span
                  onClick={() => fileInputRef.current.click()}
                  style={{
                    display: "inline-block",
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-error ring-offset-base-100 ring-offset-2">
                      <img
                        src={
                          Avatar == ""
                            ? `https://ui-avatars.com/api/?name=${firstName} ${lastName}`
                            : Avatar
                        }
                      />
                    </div>
                  </div>
                </span>
              </label>
            </div>

            <div className="ml-10">
              <h1 className="text-white text-3xl font-bold">
                {userData?.firstName} {userData?.lastName}
              </h1>
              <p className="text-white">@{userData?.username}</p>
            </div>
          </div>
          <div className="my-5 flex justify-around items-center">
            <div>
              <h1 className="text-white text-bold text-1xl">First Name: </h1>
            </div>

            <div>
              <input
                value={firstName}
                onChange={(e) => {
                  SetFirstName(e.target.value);
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-error w-full max-w-xs"
              />
            </div>
          </div>
          <div className="md-10 flex justify-around items-center">
            <div>
              <h1 className="text-white text-bold text-1xl">Last Name: </h1>
            </div>

            <div>
              <input
                value={lastName}
                onChange={(e) => {
                  SetLastName(e.target.value);
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-error w-full max-w-xs"
              />
            </div>
          </div>

          <div className="my-5 flex justify-around items-center">
            <div>
              <h1 className="text-white text-bold text-1xl">Age: </h1>
            </div>

            <div>
              <input
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-error w-full max-w-xs"
              />
            </div>
          </div>

          <div className="my-5 flex justify-around items-center">
            <div>
              <h1 className="text-white text-bold text-1xl">Email: </h1>
            </div>

            <div>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-error w-full max-w-xs"
              />
            </div>
          </div>

          <div className="my-5 flex justify-around items-center">
            <div>
              <h1 className="text-white text-bold text-1xl">Role: </h1>
            </div>

            <div>
              <input
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-error w-full max-w-xs"
              />
            </div>
          </div>

          <div className="my-5 flex justify-around items-center">
            <div>
              <h1 className="text-white text-bold text-1xl">Skills: </h1>
            </div>

            <div>
              <input
                value={skills}
                onChange={(e) => {
                  setSkills(e.target.value);
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-error w-full max-w-xs"
              />
            </div>
          </div>
<h1 className="text-center font-bold text-3xl text-white">Social Media</h1>
          <div className="my-5 flex justify-around items-center">
            <div>
              <h1 className="text-white text-bold text-1xl">Github: </h1>
            </div>

            <div>
              <input
                value={github}
                onChange={(e) => {
                  setGithub(e.target.value);
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-error w-full max-w-xs"
              />
            </div>
          </div>

          <div className="my-5 flex justify-around items-center">
            <div>
              <h1 className="text-white text-bold text-1xl">Twitter: </h1>
            </div>

            <div>
              <input
                value={twitter}
                onChange={(e) => {
                  setTwitter(e.target.value);
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-error w-full max-w-xs"
              />
            </div>
          </div>


          <div className="my-5 flex justify-around items-center">
            <div>
              <h1 className="text-white text-bold text-1xl">Linkedin: </h1>
            </div>

            <div>
              <input
                value={linkedin}
                onChange={(e) => {
                  setLinkedin(e.target.value);
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-error w-full max-w-xs"
              />
            </div>
          </div>


          <div className="my-5 flex justify-around items-center">
            <div>
              <h1 className="text-white text-bold text-1xl">YouTube: </h1>
            </div>

            <div>
              <input
                value={youtube}
                onChange={(e) => {
                  setYoutube(e.target.value);
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-error w-full max-w-xs"
              />
            </div>
          </div>
          <center>



            <button
              onClick={updateProfile}
              className="btn redBtn my-10"
              style={{
                margin: "30px 0px",
              }}
            >
              Update Profile
            </button>
          </center>

          <div
            style={{
              height: "10vh",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
