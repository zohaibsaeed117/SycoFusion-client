import React from 'react'

function ProfileViewPropCard({name, count}) {
  return (
    <div
    style={{
        backgroundColor: "#E3311D",
        color: "white",
        shadow: "0 0 8px !important",
    }}
    className="my-5 drop-shadow-4xl mx-1 w-25 card bg-base-100 shadow-5xl md:w-40 mx-5">
  <div className="flex justify-center items-center card-body">
    <p className='font-bold text-2xl md:text-4xl'>{count}</p>
    <h2 className="font-bold card-title md: text-1xl">{name}</h2>
    
  </div>
</div>
  )
}

export default ProfileViewPropCard