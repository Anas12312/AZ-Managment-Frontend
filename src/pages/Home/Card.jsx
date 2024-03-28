import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaEllipsisH, FaEllipsisV, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

export default function Card() {
    const nav = useNavigate();

    
    return (
        <div>
            <div className='card'>
                <div className='w-full flex justify-center 
                               items-center text-xl flex-shrink-0
                               flex-grow-0 group rounded-t-md'>
                    <img id={"img"} className="object-cover h-full w-full rounded-t-md" src={"../../../images/home.svg"} onError={() => { document.getElementById(`img`).src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} />
                </div>
                <div className='flex flex-col justify-center items-center h-1/2 px-10'>
                    <div className='font-bold text-lg my-2'>Stay on track and up to date</div>
                    <div className='text-center text-sm'>Invite people to units, tasks and notes, leave comments, add due dates, and we'll show the most important activity here.</div>
                </div>
            </div>
        </div>
    )
}
