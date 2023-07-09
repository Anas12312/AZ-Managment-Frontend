import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaEllipsisH, FaEllipsisV, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import config from '../../config';
export default function Card({_id:id, coverUrl, name, username, description, ownerName, starred}) {
    const nav = useNavigate();
    const [starLoading, setStarLoading] = useState(false)
    const [starredd, setStarredd] = useState(starred)
    const star = (id) => {
        if(starLoading) return
        setStarLoading(true)
        fetch(config.BASE_URL + `/units/star/${id}`, {
            method: "PUT",
            headers:  
            { 
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then((res) => res.json())
        .then((response)=>{
            const Star = document.getElementById(`star-${id}`)
            Star.classList.remove('unstarred')
            Star.classList.add('starred')
            setStarredd(true)
            setStarLoading(false)
        }).catch((err)=>{
            setStarLoading(false)
            alert(err);
        });
    }
    const unstar = (id) => {
        if(starLoading) return
        setStarLoading(true)
        fetch(config.BASE_URL + `/units/unstar/${id}`, {
            method: "PUT",
            headers:  
            {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then((res) => res.json())
        .then((response)=>{
            const Star = document.getElementById(`star-${id}`)
            Star.classList.remove('starred')
            Star.classList.add('unstarred')
            setStarredd(false)
            setStarLoading(false)
        }).catch((err)=>{
            setStarLoading(false)
            alert(err);
        });
    }
    return (
    <div className='card' onClick={(e) => {
        nav(`/unit/${id}`)
    }}>
        <div 
        id={id} 
        className=' w-full  h-1/2 rounded-t-lg' 
        style={ !(coverUrl=='') && coverUrl ? {backgroundImage:`url(${coverUrl})`, backgroundSize:'100% auto'} : {background:'#513069'}}
        >
        </div>
        <div className='relative left-3 h-1/3 flex flex-col align-middle top-2'>
            <div className='w-11/12 mt-2 flex justify-between'>
                <div className='card-header'>
                    {name}
                </div>
                <div id={`star-${id}`} className={starred?"starred":"unstarred"} onClick={(e) => {
                    console.log('click')
                    e.stopPropagation()
                    if(starredd) {
                        unstar(id)
                    }else {
                        star(id)
                    }
                }}>
                    <FaStar />
                </div>
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
            <div className='transition-all ease-linear duration-200 text-gray-700 absolute top-14 right-5 flex justify-center items-center text-lg rounded-full p-[0.5rem] hover:bg-black hover:bg-opacity-20 hover:cursor-pointer'><FaEllipsisV size={20} /></div>
        </div>
    </div>
  )
}
