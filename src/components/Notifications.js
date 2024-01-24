import React from 'react'
import NotificationCard from './NotificationCard'

const Notifications = () => {
    return (
        <div className='flex flex-col gap-4'>
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
        </div>
    )
}

export default Notifications
