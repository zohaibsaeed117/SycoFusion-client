import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { FaEllipsis, FaMessage, FaPaperPlane, FaShare, FaThumbsUp } from 'react-icons/fa6'
import Comment from './Comment';
import { useUserStore } from '@/store/store';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import EditPostModal from './EditPostModal'
import { useRouter } from 'next/navigation';
const SinglePost = ({ postId }) => {
    const router = useRouter();

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


    const [totalLikes, setTotalLikes] = useState(0);

    const handleLike = () => {
        console.log("Liking Post")

        const data = {
            postId: postId,
            likeUsername: Username
        }
        fetch(`/api/likes/handle-likes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setAlertMsg(data.message);
                setAlertType(data.type);
                setIsAlert(true);
                if (data.liked) {
                    setTotalLikes(totalLikes + 1)
                    console.log("Post Liked")
                }
                else {
                    setTotalLikes(totalLikes - 1)
                    console.log("Post Unliked")
                }

            })
    }
    const deletePost = () => {
    const data = {
    postId: postId
    }

    fetch("/api/posts/delete-post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then(res=>{
        return res.json()
    })
    .then(data =>{
        setIsAlert(true);
        setAlertMsg(data.message);
        setAlertType(data.type);

        if (data.type == "success") {
            router.push("/feed")
        }
    })
    
    }
    const editPost = () => {
        setIsLoading(true);
        const data = {
            postId: postId,
            caption: message
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
                setAlertType(data.type);
                setIsAlert(true);
                if (data.type == "success") {
                    setIsLoading(false);
                    setPostData(data.post);
                }
            })
    }
    const replyToComment = async (comment) => {

        setIsReply(true);
        setReplyTo(comment._id);
        setReplyComment(comment.username + ": " + comment.message)
    }


    const deleteComment = async (ID) => {
        console.log("Deleting Comment")
        const res = await fetch('/api/comments/delete-comment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ commentId: ID })
        })
        const result = await res.json()
        console.log(result)
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
                        isReply={true}
                    />
                ))}
            </div>
        );

    };


    const getComments = async () => {
        console.log("Getting Comments")
        const res = await fetch('/api/comments/get-comments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postId: postId })
        })
        const result = await res.json()
        console.log(result)
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
        console.log(data)
        fetch(`/api/comments/new-comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
            console.log(result);
            setPostData(result.post[0]);
            setTotalLikes(result.post[0]?.likes?.length)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            getComments();
        }
    };



    useEffect(() => {
        getPostData();
    }, [postId]);

    // const postData = {
    //     _id: 1,
    //     username: "Zohaib Saeed",
    //     createdAt: "Hello",
    //     postType: "image",
    //     caption: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos, vitae eaque. Magnam atque recusandae assumenda architecto dicta nesciunt ducimus harum. Dicta non quasi veritatis minus commodi, sapiente facilis voluptatum velit!",
    //     likes: 50,
    //     comments: [
    //         {
    //             username: "Zohaib Saeed",
    //             message: "THis is comment",
    //             isReply: false,
    //             replyTo: null,
    //             postId: 1
    //         },
    //     ],
    //     attachments: [
    //         {
    //             type: "image",
    //             url: "./abc.jpg"
    //         },
    //         {
    //             type: "image",
    //             url: "./abc.jpg"
    //         },
    //     ]
    // }
    // const comments = postData.comments;
    // const { isReply,message,replyTo,postIds,userName } = comments;
    // const isLoading = false;
    // const addComment=()=>{
    //     console.log("object")
    // }
    // const renderReplies=()=>{
    //     console.log("object")
    // }
    return (
        <div className='w-[85vw] max-w-[50rem] my-4 mx-auto shadow-lg rounded-xl'>

            <header className='grid items-center justify-between m-2 grid-cols-2 gap-3 sm:grid-cols-3'>

                <div className='flex gap-3 order-1'>
                    <img src={`https://ui-avatars.com/api/?name=${postData.username}`} alt="profilepic" className=' h-12 w-12 object-cover rounded-full border border-red-800' />
                    <div className='flex flex-col'>
                        <p className=' font-medium'>{postData.username}</p>
                        <p className='text-gray-800 font-extralight text-sm'>{format(postData.createdAt)}</p>
                    </div>
                </div>

                <div className='order-3  badge my-auto badge-primary badge-sm text-[0.5rem] sm:badge-lg sm:text-md sm:order-2 sm:ml-[-7rem]'>{postData.postType}
                </div>

                <div className='order-2 flex items-center justify-end sm:order-3'>
                    <div className='dropdown dropdown-left'>
                        <div tabIndex={0} role="button" className="btn shadow-none border-none rounded-full bg-transparent m-1"><span className=''><FaEllipsis /></span></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">

                            <li>
                                <button className="" onClick={() => document.getElementById('my_modal_3').showModal()}>Edit</button>
                                <dialog className="flex justify-center items-center w-full h-screen modal" id="my_modal_3" >
                                    <EditPostModal PostData={postData} />
                                </dialog>
                            </li>
                            <li><button onClick={deletePost}>Delete</button></li>
                        </ul>
                    </div>
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
                <button onClick={handleLike} className='btn border-none shadow-none bg-transparent text-center text-[0.6rem] cursor-pointer  sm:text-lg'>
                    <FaThumbsUp />
                    <p>Like</p>
                    <p>({totalLikes})</p>
                </button>
                <button className='btn border-none shadow-none bg-transparent text-center text-[0.6rem] cursor-pointer  sm:text-lg'>
                    <FaMessage />
                    <p>Comments</p>
                    <p>({comments.length})</p>
                </button>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button className='btn border-none shadow-none bg-transparent text-center text-[0.6rem] cursor-pointer  sm:text-lg'>
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
                    comments.map((comment, index) => {
                        console.log(comment.message, ": ", comment.isReply)


                        return (
                            <>
                                <Comment username={comment.username} replyToComment={() => {
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


export default SinglePost
