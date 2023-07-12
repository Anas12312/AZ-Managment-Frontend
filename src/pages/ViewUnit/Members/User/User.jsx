import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function User(props) {
    const nav = useNavigate()
  return (
    <div className='relative w-[95%] h-20 pl-4 flex justify-start gap-64 my-2 items-center border-2 rounded-md'>
        <div className='absolute w-16 h-16 flex justify-center items-center rounded-full border-4 border-white'>
            <img id='profile-pic' className='object-cover w-full h-full flex-shrink-0 rounded-full' src={props.imgUrl?props.imgUrl:"https://cdn-icons-png.flaticon.com/512/149/149071.png"} onError={() => { document.getElementById(`profile-pic`).src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} />
        </div>
        <div className='absolute left-32 flex flex-col justify-around w-80 text-blue-900 hover:cursor-pointer hover:text-black' onClick={()=>{
            nav('/profile/' + props.username)
        }}>
            <div><span className='text-base font-bold'>{props.name}</span> <span className='text-base font-light'>({props.username})</span></div>
        </div>
        <div className='absolute left-[42%]'>
            <div><span className='text-sm font-light'>{props.email}</span></div>
        </div>
    </div>
  )
}
