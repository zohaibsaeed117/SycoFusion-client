import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { FaEllipsis, FaMessage, FaPaperPlane, FaShare, FaThumbsUp } from 'react-icons/fa6'
import Comment from './Comment';
import { useUserStore } from '@/store/store';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
const PostModal = ({ postId, handleLike, totalLikes}) => {
    const { Username, setIsAlert, setAlertMsg, setAlertType } = useUserStore();
    //createdAt, Username, caption, likes, postType, attachments
    const [isLoading, setIsLoading] = useState(true);
    const [postData, setPostData] = useState({});
    const [message, setMessage] = useState("");
    const [comments, setComments] = useState([]);

    // For comment reply
    const [isReply, setIsReply] = useState(false);
    const [replyTo, setReplyTo] = useState("");
    const [replyComment, setReplyComment] = useState("");

    const replyToComment = async (comment) => {

        setIsReply(true);
        setReplyTo(comment._id);
        setReplyComment(comment.username + ": " + comment.message)
    }


    const deleteComment = async(ID) => {
        const res = await fetch('/api/comments/delete-comment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ commentId: ID })
        })
        const result = await res.json();
        setIsAlert(true);
        setAlertMsg(result.message);
        setAlertType(result.type);
        if (result.type == "success") {
            const newComments = comments.filter(comment => comment._id != ID);
            setComments(newComments);
        }

    }

    const renderReplies = (commentId) => {
        const replies = comments.filter((comment) => comment.replyTo === commentId);

        if (replies.length === 0) {
            return null; // No replies, render nothing
        }
        return (
            <div className="ml-10">
                {replies.map((reply) => (
                    <Comment
                        key={reply._id}
                        comment={reply}
                        deleteComment={deleteComment}
                        replyToComment={replyToComment}
                    />
                ))}
            </div>
        );

    };


    const getComments = async () => {
        const res = await fetch('/api/comments/get-comments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postId: postId })
        })
        const result = await res.json()
     
        if (result.type == "error") {
            setIsAlert(true);
            setAlertMsg(result.message);
            setAlertType(result.type);
        }
        else {
            setComments(result.comments);
        }
        setIsLoading(false);
    }


    const addComment = async () => {
        const data = {
            username: Username,
            postId: postId,
            isReply: isReply,
            message: message,
            replyTo: replyTo
        }
        fetch(`/api/comments/new-comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setIsAlert(true);
                setAlertMsg(data.message);
                setAlertType(data.type);

                if (data.type == "success") {
                    setMessage("");
                    setComments([...comments, data.result])
                }
            })
    }

    const getPostData = async () => {
        setIsLoading(true); // Set loading state to true before fetching data

        const data = {
            postId: postId,
        };

        try {
            const response = await fetch(`/api/posts/get-single-post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch post data');
            }

      const result = await response.json();
      setPostData(result.post[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      getComments();
    }
  };



    useEffect(() => {
        getPostData();
    }, [postId]);

    return (
        <div className='modal-box w-11/12 max-w-[50rem] my-4 mx-auto shadow-lg rounded-xl'>

            <header className='flex items-center justify-between m-2'>
                <div className='flex gap-3'>
                    <img src={`https://ui-avatars.com/api/?name=${postData.username}`} alt="profilepic" className=' h-12 w-12 object-cover rounded-full border border-red-800' />
                    <div className='flex flex-col'>
                        <p className=' font-medium'>{postData.username}</p>
                        <p className='text-gray-800 font-extralight text-sm'>{format(postData.createdAt)}</p>
                    </div>
                    <div className='badge my-auto badge-primary'>{postData.postType}</div>
                </div>
                <div className='flex items-center justify-center'>
                    <div className='dropdown dropdown-left'>
                        <div tabIndex={0} role="button" className="btn shadow-none border-none rounded-full bg-transparent m-1"><span className=''><FaEllipsis /></span></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">

                            <li><a>This is option 2</a></li>
                        </ul>
                    </div>
                    <form method="dialog">
                        <button className="btn shadow-none border-none rounded-full bg-transparent m-1">✕</button>
                    </form>
                </div>

            </header>
            {
                isLoading ? (
                    <center>
                        <span className="my-10 text-center loading loading-dots loading-lg"></span>
                    </center>
                ) : (
                    ""
                )
            }
            <Splide options={{ arrows: postData?.attachments?.length > 1 ? true : false }} className='my-4' aria-label="My Favorite Images">
                {
                    postData?.attachments?.map((attachment, index) => {
                        return (
                            <SplideSlide>
                                <img className='slider-img rounded-2xl' key={index} src={attachment.url} alt="post" />
                            </SplideSlide>
                        )
                    })
                }
            </Splide>
            <div className='px-4 my-2 text-sm sm:text-lg'>{postData.caption}</div>

            <div className='flex items-center justify-evenly py-2'>
                <button onClick={handleLike} className='btn border-none shadow-none bg-transparent text-center text-md cursor-pointer hover:text-gray-400 sm:text-lg'>
                    <FaThumbsUp />
                    <p>Like</p>
                    <p>({totalLikes})</p>
                </button>
                <button className='btn border-none shadow-none bg-transparent text-center text-md cursor-pointer hover:text-gray-400 sm:text-lg'>
                    <FaMessage />
                    <p>Comments</p>
                    <p>({comments.length})</p>
                </button>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button className='btn border-none shadow-none bg-transparent text-center text-md cursor-pointer hover:text-gray-400 sm:text-lg'>
                    <FaShare />
                    <p>Share</p>
                    <p></p>
                </button>
            </div>
            <div className='join w-full'>
                {
                    isReply ? (
                        <div className='flex justify-center items-center flex-row'>
                            <h1>Replying to: {replyComment}</h1>
                        </div>
                    ) : (
                        ""
                    )
                }
                <input value={message} onChange={e => setMessage(e.target.value)} type="text" placeholder="Enter your comment" className="input input-primary input-bordered join-item w-full" />
                <button onClick={addComment} className="btn join-item rounded-r-full btn-primary"><FaPaperPlane /></button>
            </div>
            <div className='my-2'>
               {
                comments.map((comment, index)=> {
                  
                      
                            return (
                                <>
                                <Comment replyToComment={()=> {
                                    replyToComment(comment);
                                }} deleteComment={() => {
                                    deleteComment(comment._id)
                                }} key={comment._id} comment={comment} />

                                {renderReplies(comment._id)}
                            </>

                        )


                    })
                }
            </div>
        </div >
    )
}
export default PostModal
