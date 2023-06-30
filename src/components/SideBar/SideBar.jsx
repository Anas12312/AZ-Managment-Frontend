import React, { useEffect } from 'react'
import SideBarItem from './SideBarItem/SideBarItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaCube, FaStar, FaUser, FaFile, FaClock, FaPlus } from 'react-icons/fa'

export default function SideBar(props) {
  return (

    <div className='flex flex-col h-full max-h-screen flex-grow w-72 pt-3 bg-gray-400 bg-opacity-10'>
      <div className='new-button'>
        <FaPlus /> New
      </div>
      <div className='relative flex flex-col left-3 top-7'>
        <SideBarItem id={"my-units"} text={"My Units"} icon={<FaFile />} link={"/resources"} />
        <SideBarItem id={"shared"} text={"Shared With Me"} icon={<FaUser />} link={""} />
        <SideBarItem id={"starred"} text={"Starred"} icon={<FaStar />} link={""} />
        <SideBarItem id={"recent"} text={"Recents"} icon={<FaClock />} link={""} />
      </div>
    </div>
  )
}
