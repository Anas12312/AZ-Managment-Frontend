import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Card({_id:id, coverUrl, name, username, description, ownerName}) {
    const nav = useNavigate();
    return (
    <div className='card' onClick={() => {
        nav(`/unit/${id}`)
    }}>
        <div 
        id={id} 
        className=' w-full  h-1/2 rounded-t-lg' 
        style={ !(coverUrl=='') && coverUrl ? {backgroundImage:`url(${coverUrl})`, backgroundSize:'100% auto'} : {background:'#513069'}}
        >
        </div>
        <div className='relative left-3 h-1/3 flex flex-col align-middle top-2'>
            <div className='w-11/12 mt-2'>
                <span className='card-header'>
                    {name}
                </span>
            </div>
            <div className='w-11/12'>
                <span className='card-text'>
                    {description}
                </span>
            </div>
            <div className='w-11/12'>
                <span className='card-text'>
                    Created By: {ownerName}
                </span>
            </div>
        </div>
    </div>
  )
}
