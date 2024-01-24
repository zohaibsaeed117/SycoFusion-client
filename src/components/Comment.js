import React from 'react'

const Comment = () => {
    const isAuthor = true;
    return (
        <>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className="chat-header">
                    Obi-Wan Kenobi
                    <time className="text-xs opacity-70">12:45</time>
                </div>
                <div className="chat-bubble chat-bubble-primary">You were the Chosen One!</div>
                <div className="chat-footer text-black opacity-70 underline flex gap-2">

                    <div className={`dropdown dropdown-bottom ${isAuthor ? "block" : "hidden"}`}>
                        <div tabIndex={0} role="button" className="m-1"><span className='underline'>Edit</span></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>This is option 1</a></li>
                            <li><a>This is option 2</a></li>
                        </ul>
                    </div>

                    <button>reply</button>
                </div>
            </div>

        </>
    )
}

export default Comment
