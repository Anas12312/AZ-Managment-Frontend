import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import config from '../../../../../config'

export default function User({ _id, name, email, username, imgUrl, status, invetationId: invitationId, isOnwer, unitId }) {
    const nav = useNavigate()

    const statusEl = useRef()

    useEffect(() => {
        if (status === 'OWNER') {
            statusEl.current.classList.add('text-yellow-600')
        }
        if (status === 'ACCEPTED') {
            statusEl.current.classList.add('text-green-700')
        }
        if (status === 'PENDING') {
            statusEl.current.classList.add('text-slate-700')
        }
    })

    const removeMember = () => {
        fetch(config.BASE_URL + `/units/users/${unitId}/${_id}`, {
            method:'DELETE',
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then(async res => {
            if(res.status === 200) nav(0)
        }).catch(err => {
            console.log(err);
        })
    }

    const removePendingMember = () => {
        fetch(config.BASE_URL + `/units/users/${invitationId}`, {
            method:'DELETE',
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then(async res => {
            if(res.status === 200) nav(0)
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='relative w-[95%] h-20 pl-4 flex justify-start gap-64 my-2 items-center border-2 rounded-md'>
            <div className='absolute w-16 h-16 flex justify-center items-center rounded-full border-4 border-white'>
                <img
                    id='profile-pic'
                    className='object-cover w-full h-full flex-shrink-0 rounded-full'
                    src={imgUrl ? imgUrl : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    onError={() => { document.getElementById(`profile-pic`).src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
                />
            </div>

            <div
                className='absolute left-32 flex flex-col justify-around w-80 text-blue-900 hover:cursor-pointer hover:text-black'
                onClick={() => {
                    nav('/profile/' + username)
                }}
            >
                <div>
                    <span className='text-base font-bold'>{name}</span>
                    <span className='text-base font-light'>({username})</span>
                </div>
            </div>

            <div className='absolute left-[42%]'>
                <div><span className='text-sm font-light'>{email}</span></div>
            </div>

            <div className='absolute left-[66%]'>
                <div><span ref={statusEl} className='text-sm font-bold select-none'>{status}</span></div>
            </div>

            {isOnwer && (
                <div className='absolute left-[90%]'>{
                    (status !== 'OWNER') && (
                        <div onClick={() => {
                            if(status === 'PENDING') {
                                removePendingMember()
                            }else {
                                removeMember()
                            }
                        }} className='cursor-pointer select-none text-white bg-red-600 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center'>
                            Remove
                        </div>
                    )
                }
                </div>
            )}
        </div>
    )
}
