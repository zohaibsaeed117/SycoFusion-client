"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { BsShareFill } from "react-icons/bs";

import "../../../css/globals.css";

import { useUserStore } from "@/store/store";

import PostFeedView from "@/components/Post";
import { useRouter } from "next/navigation";
import SinglePost from "@/components/SinglePost";
import Post from "@/components/Post";
var jwt = require('jsonwebtoken');
export default function Home({ params }) {
  const { postId } = params;
  const [postContent, setPostContent] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
  const [postAttachments, setPostAttachments] = useState([]);
  const [caption, setCaption] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  const { setIsAlert, setAlertMsg, setAlertType, username } = useUserStore();
  const router = useRouter();

  const checkIsAccountLogin = async () => {

    let key = process.env.NEXT_PUBLIC_JWT_TOKEN;
    var token = localStorage.getItem("token")
    if (token != null) {
      var verification = await jwt.decode(token, key);
      if (verification == null) {
        router.push("/login")
      }
    }
  }






  useEffect(() => {
    checkIsAccountLogin();

    const data = {
      postId: postId,
    };
    fetch(`/api/posts/get-single-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setPostContent(data.post[0]);
        setPostAttachments(data.post[0].attachments)

        setIsLoading(false);
        setPostLikes(data.post[0].likes);
      });

  }, []);

  return (
    <>
      {isLoading && (
        <center>
          <span className="my-10 text-center loading loading-dots loading-lg"></span>
        </center>
      )}


      <div className='flex justify-center items-center flex-col'>

        {
          isLoading && (
            <Post postId={postContent._id} createdAt={postContent.createdAt} Username={postContent.username} caption={postContent.caption} likes={postLikes} postType={postContent.postType} attachments={postAttachments} />

          )
        }



      </div>
    </>
  );
}