import React from 'react'

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
    )
}

export default Loader
