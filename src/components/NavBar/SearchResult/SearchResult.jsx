import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchResult(props) {

  return (
    <div 
    className='w-full flex items-center rounded-md border my-1 p-1 bg-white hover:bg-gray-200 hover:cursor-pointer' 
    onClick={props.onClick}
    >
        <div className='relative w-11 h-11 flex justify-center items-center rounded-full border-4 border-white group my-1 mr-2'>
            <img id='profile-pic' className='object-cover w-full h-full flex-shrink-0 rounded-full' src={props.imgUrl?props.imgUrl:"https://cdn-icons-png.flaticon.com/512/149/149071.png"} onError={() => { document.getElementById(`profile-pic`).src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} />
        </div>
        <div className='flex flex-col justify-around'>
            <div><span className='text-xs font-bold'>{props.name}</span> <span className='text-xs font-light'>({props.username})</span></div>
            <div><span className='text-xs'>{props.email}</span></div>
        </div>
    </div>
  )
}
