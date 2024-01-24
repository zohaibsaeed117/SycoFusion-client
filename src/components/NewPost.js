"use client";
import React, { useState } from "react";
// import "../css/new-post.css";
import "../css/globals.css";

import { ImFilePicture } from "react-icons/im";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BiVideo } from "react-icons/bi";

import { useUserStore } from "@/store/store";
import ImgInput from "./ImgInput"
import { useRouter } from "next/navigation";

function NewPost() {
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [postType, setPostType] = useState("");
  const { theme,isAlert, alertMsg, alertType, setIsAlert, setAlertMsg, setAlertType, setTheme, setIsLogin, isLogin, setFirstName, setLastName, setAvatar, Username, attachments,resetAttachments,uploadProgressCaption, attachmentProgress } = useUserStore();


  const clearAttachments = () => {
    resetAttachments();
  }
  const publishPost = () => {
    if (caption == "") {
      alert("Write some caption for the post");
    }
    else if (title == "") {
      alert("Write title for the post");
    }
    else {
      const data = {
        "username": Username,
        "title": title,
        "caption": caption,
        "postType": postType,
        "attachments": attachments
      }
      fetch(`/api/posts/new-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        setAlertMsg(data.message);
        setIsAlert(true);
        setAlertType(data.type);

        if (data.type == "success") {

          // router.push(`/posts/${data.id}`)

        }
  
  
  
      })

    }

   
  }
  return (
  <div className="flex justify-center items-center">
    <div className="flex justify-center items-center flex-col border py-5 px-20 rounded-2xl w-[70%]">
  <select defaultValue={"Daily"} onChange={(e)=> {
    setPostType(e.target.value);
    console.log(e.target.value)
  }} className="select select-ghost w-full max-w-xs">
    <option value={"Daily"}>Daily Post</option>
    <option value={"Achievement"}>Achievement</option>
    <option value={"Project"}>Project</option>
  </select>
  <textarea
  value={title}
  onChange={(e)=>{
    setTitle(e.target.value)
  }}
    placeholder="Post Title!"
    className={`activeInput my-10 textarea textarea-lg w-full max-w-xs`}
  ></textarea>
  <textarea
  value={caption}
  onChange={(e)=>{
    setCaption(e.target.value)
  }}
    placeholder="Post Caption!"
    className={`activeInput my-10 textarea textarea-lg w-full max-w-xs`}
  ></textarea>

  <hr className="w-full my-10" />


  <div className="my-5 collapse">
<input type="checkbox" /> 
<div className="collapse-title text-xl font-medium">
Click to show/hide files ({attachments.length})
</div>
<div className="collapse-content"> 
{
  attachments.length==0?<h1 className="my-5">No Upload Files Found. Upload some files to see them here.</h1>:""
}
<div className="grid grid-cols-3">

    {attachments.map((attach, index) => {
      return (
        <div
        className="flex justify-center items-center w-full"
          style={{
            backgroundColor: "rgb(229, 230, 230)",
            width: "80%",
            borderRadius: "20px",
            margin: "20px 20px",
          }}
        >
          {
            attach.type=="image"?(
              <img style={{
         
              }} src={attach.url}/>
            ):(
              <video controls  src={attach.url} />
            )
          }
        
        </div>
      );
    })}
  </div>
<button onClick={clearAttachments} className="text-center my-10 btn redBtn">Clear Attachments</button>
</div>
</div>


  <div
    style={{
      width: "100%",
    }}
    className="flex justify-between items-center"
  >
    <div className="flex justify-center items-center icons">
     <ImgInput/>
    </div>

    <button onClick={publishPost} className="btn btn-primary redBtn">Post</button>
  </div>

  <div className="my-10 flex justify-center items-center flex-col">
    <span className="my-5">{uploadProgressCaption}</span>
  <div>
  <progress className="progress progress-error w-56" value={attachmentProgress} max="100"></progress>
  <span className="font-bold mx-5">{parseInt(attachmentProgress)}%</span>
  </div>


  </div>
</div>
</div>
  );
}

export default NewPost;