import React from 'react'
import { FaComment, FaThumbsUp } from 'react-icons/fa6';

const NotificationCard = () => {
    const type = "like";
    const notificationVisit=true;
    const backgroundStyle=notificationVisit?"bg-blue-400":""
    return (
        <div className={`w-[60vw] shadow-xl m-auto flex gap-x-4 rounded-xl p-2 ${backgroundStyle}`}>
            {type === "like" ? <FaThumbsUp className='m-4 h-full w-full max-w-16' /> : <FaComment />}
            <div>
                <h1 className=' text-xl'>This is the title of the notification</h1>
                <p className=''>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, ipsa veniam doloribus asperiores rem maxime a mollitia cumque blanditiis ipsum perferendis, commodi autem? Nisi, minima perferendis sapiente consectetur laborum voluptatum praesentium est.</p>
            </div>
        </div>
        
    )
}

export default NotificationCard
