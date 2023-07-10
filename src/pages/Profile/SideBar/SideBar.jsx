
import React, { useEffect, useState } from 'react'
import SideBarItem from './SideBarItem/SideBarItem'
import { FaCube, FaStar, FaUser, FaFile, FaClock, FaPlus } from 'react-icons/fa'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';


export default function SideBar({selected}) {
  
  return (

    <div className='flex flex-col h-full max-h-screen flex-grow w-72 pt-3 bg-gray-400 bg-opacity-10'>
      <div className='relative flex flex-col left-3 top-7'>
        {selected === 'my-units'?(<SideBarItem id={"my-units"} text={"My Units"} icon={<FaFile />} link={"/resources"} selected={true} />):(<SideBarItem id={"my-units"} text={"My Units"} icon={<FaFile />} link={"/resources"} />)}
        {selected === 'starred'?(<SideBarItem id={"starred"} text={"Starred"} icon={<FaStar />} link={"/resources/starred"} selected={true} />):(<SideBarItem id={"starred"} text={"Starred"} icon={<FaStar />} link={"/resources/starred"} />)}
        {selected === 'shared'?(<SideBarItem id={"shared"} text={"Shared With Me"} icon={<FaUser />} link={""} selected={true} />):(<SideBarItem id={"shared"} text={"Shared With Me"} icon={<FaUser />} link={""} />)}
        {selected === 'recent'?(<SideBarItem id={"recent"} text={"Recents"} icon={<FaClock />} link={""} selected={true} />):(<SideBarItem id={"recent"} text={"Recents"} icon={<FaClock />} link={""} />)}
      </div>
    </div>
  )
}
