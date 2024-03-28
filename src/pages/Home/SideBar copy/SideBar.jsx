
import React, { useEffect, useState } from 'react'
import { FaCube, FaStar, FaUser, FaFile, FaClock, FaPlus } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom';


export default function SideBar({ selected }) {
  const [user, setUser] = useState({});
  useEffect(()=>{
    const localUser = JSON.parse(localStorage.getItem('user'));
    setUser(localUser)
    console.log(localUser)
  }, [])
  return (

    <div className='flex flex-col h-full  pt-3 bg-gray-400 bg-opacity-10'>
      <div className='absolute w-60 flex flex-col left-3 top-24'>
          <NavLink end to={'/profile'} className='mb-6 pb-5 border-b-2'>
          <div className='flex'>
            {user.imgUrl ? (
              <div className='w-16 h-16 flex justify-center items-center
                            bg-primary-1 rounded-full text-2xl border-2
                            border-gray-400 text-white flex-shrink-0 flex-grow-0'>
                              <img className="object-cover w-full h-full rounded-full" src={user.imgUrl} />
              </div>) : (
              <div className='w-1/4 h-1/4 flex justify-center
                              items-center bg-primary-1 rounded-full
                              text-2xl border-4 border-black 
                              text-white'>{user.name ? user.name[0].toUpperCase() : "P"}
              </div>
            )}
            <div className='flex flex-col w-full justify-center mx-1 ml-3'>
                <div className='font-bold text-lg'>{user.name}</div>
                <div className='text-xs'>{user.email}</div>
            </div>
          </div>
          </NavLink>
          <NavLink end to={'/profile'} className={({isActive, isPending}) => isActive ? 'side-bar-item side-bar-item-selected': 'side-bar-item'}>
              <div className='fixed left-6'><FaUser/></div>
              <div className='fixed left-12'>My Profile</div>
          </NavLink>

          <NavLink end to={'/profile/settings'} className={({isActive, isPending}) => isActive ? 'side-bar-item side-bar-item-selected': 'side-bar-item'}>
              <div className='fixed left-6'><FaUser/></div>
              <div className='fixed left-12'>Settings</div>
          </NavLink>
      </div>
    </div>
  )
}
