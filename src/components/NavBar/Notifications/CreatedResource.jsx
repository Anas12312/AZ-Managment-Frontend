import React from 'react'

export default function CreatedResource(props) {
  return (
    <div className='notification'>
        <div className='relative w-11 h-11 flex justify-center items-center rounded-full border-2 border-white group my-1 mr-2'>
            <img id='profile-pic' className='object-cover w-full h-full flex-shrink-0 rounded-full' src={props.actorId.imgUrl?props.actorId.imgUrl:"https://cdn-icons-png.flaticon.com/512/149/149071.png"} onError={() => { document.getElementById(`profile-pic`).src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} />
        </div>
        <div className='flex flex-col justify-around w-[14rem]'>
            <div><span className='text-sm font-bold'>{props.actorId.name} <span className='text-sm font-normal'> Created {props.actionId.type=='IMAGE'?'an':'a'} {props.actionId.type.toLowerCase()} in Node ({props.nodeName})  in Unit ({props.unitName})</span></span> </div>
        </div> 
    </div>
  )
}
