import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { FaEllipsis, FaMessage, FaPaperPlane, FaShare, FaThumbsUp } from 'react-icons/fa6'
import Comment from './Comment';
import { useUserStore } from '@/store/store';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
const PostModal = () => {
  const { Username, setIsAlert, setAlertMsg, setAlertType } = useUserStore();
  //createdAt, Username, caption, likes, postType, attachments
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState({});
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);




  useEffect(() => {
  }, []);

  return (
    <>

      <div className="modal-box ">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Edit the post!</h3>
        <p className="py-4">Press ESC key or click on ✕ button to close</p>
      </div>
    </>
  )
}
export default PostModal
