import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import { useNavigate } from 'react-router-dom'
import config from '../../../../config'
import { FaEdit, FaUber, FaUpload } from 'react-icons/fa'
import UpdatePhotoModal from '../../../modals/updatePhotoModal'
export default function ProfileData({data, isAuthorized}) {
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState(data.name)
    const [editPhoto, setEditPhoto] = useState(false)
    const [photo, setPhoto] = useState(data.imgUrl)
    const nav = useNavigate()
    const doneEditing = () => {
        update()
        setEditName(false)
        const user = JSON.parse(localStorage.getItem('user'))
        user.name = name
        localStorage.setItem('user', JSON.stringify(user))
    }
    const update = () => {
        fetch(config.BASE_URL + '/users' , {
            method: 'PUT',
            headers:  { 
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(
              {
                name: name
              }
            )
          }).then(res => {
            nav(0)
          })
          .catch(error => {
            console.log(error);
          })
    }
  return (
    <div className='flex w-full h-full'>
        <UpdatePhotoModal
            isOpen={editPhoto}
            setIsOpen={setEditPhoto}
            photo={data&&data.imgUrl}
        />
        <SideBar />
        <div className='w-full h-full'>
            {/* Profile Info */}
            <div className='h-1/2 flex items-center bg-slate-300 font-bold shadow'>
                <div className='w-80 h-80 flex justify-center items-center ml-6'>
                    <div className='relative w-60 h-60 flex justify-center items-center rounded-full border-4 border-white group '>
                        <img id='profile-pic' className='object-cover w-full h-full flex-shrink-0 rounded-full' src={data&&(data.imgUrl?data.imgUrl:"https://cdn-icons-png.flaticon.com/512/149/149071.png")} onError={() => { document.getElementById(`profile-pic`).src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} />
                        {isAuthorized&&(
                            <span onClick={()=>{
                                setEditPhoto(true)
                            }} className='image-tooltip group-hover:scale-100'><FaUpload /></span>
                        )}
                    </div>
                </div>
                <div className='w-full p-5 text-2xl flex flex-col h-full justify-end'>
                    <div className='h-2/3'>
                        <div className='m-3 text-4xl group'>{editName?(
                            <input 
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyPress={(e)=>{
                                if(e.key == "Enter"){
                                    doneEditing()
                                }
                            }}
                            onBlur={()=>{
                                doneEditing()
                            }}
                            className='h-10 p-2 text-lg font-normal'/>
                        ):(<span>{data&&data.name}{isAuthorized&&(<span onClick={()=>{setName(data&&data.name);setEditName(true)}} className='name-tooltip group-hover:scale-100'><FaEdit /></span>)}</span>)}<span className='text-3xl font-light'> ({data&&data.username})</span></div>
                        <div className='m-3 text-xl font-light'>{data&&data.email}</div>
                    </div>
                </div>
                <div className='w-5/6 flex justify-center items-center h-full'>
                    {!isAuthorized&&(
                        <div>Invite</div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
