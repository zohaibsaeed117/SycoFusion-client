"use client"
import React, {useState} from 'react'
import {format} from "timeago.js";
import { useUserStore } from '@/store/store';
const Comment = ({comment, deleteComment, replyToComment, isReply}) => {
    
    const isAuthor = true;
    const {Username, setIsAlert, setAlertMsg, setAlertType } = useUserStore();
    const [isEdit, setIsEdit] = useState(false);
    const [previousMsg, setPreviousMsg] = useState(comment.message);
    const [message, setMessage] = useState(comment.message);

    const editComment = ()=> {
        setIsEdit(true);
    }

    const saveEditedComment = async()=> {

        setIsEdit(false);
        const res = await fetch('/api/comments/update-comment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ commentId: comment._id, message: message })
        })
        const result = await res.json();
        setIsEdit(false);
        setIsAlert(true);
        setAlertMsg(result.message);
        setAlertType(result.type);

        if (result.type == "error") {
            setMessage(previousMsg);
        }
        else {
            setPreviousMsg(message);
        }
    }
    const cancelComment = ()=> {
        setIsEdit(false);
    }
    return (
        <>
            <div style={{
                zIndex: 5
            }} className="chat chat-start">
                <div style={{
                    display: isEdit? "none" : "block"
                }} className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img src={`https://ui-avatars.com/api/?name=${comment.username}`} alt="profilepic" className=' h-12 w-12 object-cover rounded-full border border-red-800' />
                       </div>
                </div>
                <div style={{
                    display: isEdit? "none" : "block"
                }} className="chat-header">
                   {comment.username}
                    <time style={{
                    display: isEdit? "none" : "inline-block"
                }} className="mx-2 text-xs opacity-70">{format(comment.createdAt)}</time>
                </div>
               <div style={{
                    display: isEdit? "none" : "block"
                }} className="chat-bubble chat-bubble-primary">{message}</div>
               <div style={{
                    display: isEdit? "block" : "none"
                }} className='flex justify-center items-center flex-row'>
                    <input value={message} onChange={e=>setMessage(e.target.value)} type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
                <button  className='mx-2 btn btn-sm btn-primary' onClick={saveEditedComment}>Save</button>
                <button  className='mx-2 btn btn-sm btn-primary' onClick={cancelComment}>Cancel</button>
               </div>
                <div className="chat-footer text-black opacity-70 underline flex gap-2">

                    <div style={{
                        zIndex: 5,
                    display: isEdit? "none" : "block"
                }} className={`dropdown dropdown-bottom ${Username==comment.username ? "block" : "hidden"}`}>
                        <div tabIndex={0} role="button" className="m-1"><span className='underline'>Edit</span></div>
                        <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><button onClick={editComment}>Edit</button></li>
                            <li><button className='text-red-500' onClick={deleteComment}>Delete</button></li>
                        </ul>
                    </div>
{
    isReply?null:(
        
        <button onClick={replyToComment} style={{
            display: isEdit? "none" : "block"
        }}>reply</button>
    )
}
                </div>
            </div>

        </>
    )
}

export default Comment
