
import React, { useEffect, useState } from 'react'
import SideBarItem from './SideBarItem/SideBarItem'
import { FaCube, FaStar, FaUser, FaFile, FaClock, FaPlus } from 'react-icons/fa'
import Modal from 'react-modal';
import { NavLink, useNavigate } from 'react-router-dom';


export default function SideBar({selected}) {
  
  return (

    <div className='flex flex-col h-full  pt-3 bg-gray-400 bg-opacity-10'>
      <div className='absolute w-60 flex flex-col left-3 top-32'>
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
