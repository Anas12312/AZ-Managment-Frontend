import React from 'react'
import SideBarItem from './SideBarItem/SideBarItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaCube, FaStar, FaUser, FaFile, FaClock, FaPlus } from 'react-icons/fa'

export default function SideBar() {
  return (
    <div className='flex flex-col h-full max-h-screen flex-grow w-80 pt-3 bg-gray-400 bg-opacity-10'>
      <div className='new-button'>
        <FaPlus /> New
      </div>
      <div className='relative flex flex-col left-3 top-7'>
        <SideBarItem selected={true} text={"My Units"} icon={<FaFile />} link={"/resources"} />
        <SideBarItem text={"Shared With Me"} icon={<FaUser />} link={""} />
        <SideBarItem text={"Starred"} icon={<FaStar />} link={""} />
        <SideBarItem text={"Recents"} icon={<FaClock />} link={""} />
      </div>
    </div>
  )
}
