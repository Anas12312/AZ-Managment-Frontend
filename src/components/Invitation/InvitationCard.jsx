import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import config from '../../../config'

export default function InvitationCard(props) {
    const [fullDate, setFullDate] = useState(new Date(props.date))
    const nav = useNavigate()
    const acceptInvitation = () => {
        fetch(config.BASE_URL + '/invitations/accept/' + props._id, {
            method: 'POST',
            headers:  { 
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem('token')
            },
        })
        .then(res => nav(0))
        .catch((e) => {

        }) 
    }
    const declineInvitation = () => {
        fetch(config.BASE_URL + '/invitations/decline/' + props._id, {
            method: 'POST',
            headers:  { 
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem('token')
            },
        })
        .then(res => nav(0))
        .catch((e) => {

        }) 
    }
    useEffect(()=>{
        const d = new Date(props.date)
        setFullDate(d)
    },[])
  return (
    <div className='ml-10 w-[95%] border-2 rounded-md p-2 flex items-center m-1 relative'>
        <div className='w-16 h-full flex justify-center items-center
                    bg-primary-1 text-xl rounded-full m-2 mr-4 hover:cursor-pointer
                    text-white flex-shrink-0 flex-grow-0 group'
             onClick={()=>{
                nav('/profile/' + props.invitedBy.username)
             }}>
            {props.invitedBy.imgUrl?(
                <img id={"img"} className="object-cover w-full h-full rounded-full" src={props.invitedBy.imgUrl} onError={() => { document.getElementById(`img`).src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} />
            ):(
                <img id={"img"} className="object-cover w-full h-full rounded-full" src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} onError={() => { document.getElementById(`img`).src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} />
            )}
        </div>
        <div className='flex flex-col justify-center w-[30%] h-full hover:cursor-pointer' onClick={()=>{
            nav('/profile/' + props.invitedBy.username)
        }}>
            <div><span className='text-lg font-bold'>{props.invitedBy.name}</span> <span>({props.invitedBy.username})</span></div>
            <div>{props.invitedBy.email}</div>
        </div>
        <div className='text-xl font-bold flex flex-col justify-center w-[18%] h-full'>
            <div>Invited you to join:</div>
        </div>
        <div className='text-lg flex flex-col justify-center w-[14%] h-full text-blue-600'>
            <div>{props.unit.name}</div>
        </div>
        <div className='text-sm flex flex-col justify-center w-[20%] h-full'>
            <div>{fullDate.toDateString()}</div>
        </div>
        <div className='text-sm flex items-center justify-end w-[20%] h-full pr-2'>
            <div className='w-12 h-12 bg-green-700 text-white text-lg border flex justify-center
                            items-center hover:bg-green-600 hover:cursor-pointer
                            trans rounded-md'
                 onClick={()=>{
                    acceptInvitation()
                 }}><FaCheck /></div>
            <div className='w-12 h-12 bg-red-700 border text-white text-lg font-bold flex justify-center 
                            items-center hover:bg-red-600 hover:cursor-pointer
                            trans rounded-md'
                 onClick={()=>{
                    declineInvitation()
                 }}>X</div>
        </div>
    </div>
  )
}
