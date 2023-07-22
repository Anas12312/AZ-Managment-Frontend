import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreatedNode(props) {
  const nav = useNavigate()
  return (
    <div className='notification'
    onClick={(e) => { nav('/unit/' + props.unitId); nav(0) }}
    >
        {!props.seen ? (<div className='w-2 h-2 bg-blue-500 rounded-full mx-1'></div>) : (<div className=''></div>) }
        <div className='relative w-11 h-11 flex justify-center items-center rounded-full border-2 border-white group my-1 mr-2'>
            <img id='profile-pic' 
              className='object-cover w-full h-full flex-shrink-0 rounded-full' 
              src={props.actorId.imgUrl?props.actorId.imgUrl:"https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
              onError={() => { document.getElementById(`profile-pic`).src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
            />
        </div>
        <div className='flex flex-col justify-around w-[14rem]'>
            <div><span className='text-sm font-bold'>{props.actorId.name}</span> <span className='text-sm font-normal'>Created a Node ({props.actionId.name}) in Unit ({props.unitName})</span></div>
        </div> 
    </div>
  )
}
