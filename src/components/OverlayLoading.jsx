import React from 'react'

const OverlayLoading = () => {
    return (
        <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
    )
}

export default OverlayLoading
