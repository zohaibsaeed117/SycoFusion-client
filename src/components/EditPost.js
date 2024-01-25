"use client";
import React, { useEffect, useState } from "react";
// import "../css/new-post.css";
import "../css/globals.css";

import { ImFilePicture } from "react-icons/im";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BiVideo } from "react-icons/bi";

import { useUserStore } from "@/store/store";
import ImgInput from "./ImgInput"
import { useRouter } from "next/navigation";

function NewPost({ PostData }) {
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [Id, setId] = useState("");
  const [postType, setPostType] = useState("Daily Post");
  const { theme, isAlert, alertMsg, alertType, setIsAlert, setAlertMsg, setAlertType, setTheme, setIsLogin, isLogin, setFirstName, setLastName, setAvatar, Username, attachments, resetAttachments, uploadProgressCaption, attachmentProgress } = useUserStore();


  useEffect(() => {
    setTitle(PostData?.title);
    setCaption(PostData?.caption);
    setId(PostData?._id)
  }, [])

  const clearAttachments = () => {
    resetAttachments();
  }
  const updatePost = () => {
    if (caption == "") {
      alert("Write some caption for the post");
    }
    else if (title == "") {
      alert("Write title for the post");
    }
    else {
      const data = {
        "postId": Id,
        "title": title,
        "caption": caption,
        "postType": postType
      }
      fetch(`/api/posts/edit-post`, {
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
    <div className="flex justify-center items-center w-full">
      <div className="flex justify-center items-center border-primary flex-col border px-5 py-5 rounded-2xl w-[100%] sm:px-10">
        <select defaultValue={"Daily"} onChange={(e) => {
          setPostType(e.target.value);
          console.log(e.target.value)
        }} className="select select-primary w-full max-w-xs">
          <option value={"Daily Post"}>Daily Post</option>
          <option value={"Achievement"}>Achievement</option>
          <option value={"Project"}>Project</option>
        </select>
        <textarea
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          placeholder="Post Title!"
          className={`activeInput my-10 textarea textarea-primary textarea-sm w-full max-w-xs text-sm sm: textarea-lg sm:text-lg`}
        ></textarea>
        <textarea
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value)
          }}
          placeholder="Post Caption!"
          className={`activeInput my-10 textarea textarea-primary textarea-sm w-full max-w-xs text-sm sm:text-lg sm:textarea-lg`}
        ></textarea>

        <hr className="w-full my-10" />


        <div className="my-5 collapse">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Click to show/hide files ({attachments.length})
          </div>
          <div className="collapse-content">
            {
              attachments.length == 0 ? <h1 className="my-5">No Files Uploaded.</h1> : ""
            }
            <div className="grid grid-cols-3">

              {PostData?.attachments?.map((attach, index) => {
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
                      attach.type == "image" ? (
                        <img style={{

                        }} src={attach.url} />
                      ) : (
                        <video controls src={attach.url} />
                      )
                    }

                  </div>
                );
              })}
            </div>
            {/* <button onClick={clearAttachments} className="text-center my-10 btn redBtn">Clear Attachments</button> */}
          </div>
        </div>


        <div
          style={{
            width: "100%",
          }}
          className="flex justify-between items-center"
        >
          <div className="flex justify-center items-center icons">
            {/* <ImgInput/> */}
          </div>
          <form method="post">
            <button onClick={updatePost} className="btn btn-primary redBtn">Update</button>
          </form>
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