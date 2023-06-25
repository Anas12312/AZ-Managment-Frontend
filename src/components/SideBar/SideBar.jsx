import React from 'react'
import SideBarItem from './SideBarItem/SideBarItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaCube, FaStar, FaUser, FaFile, FaClock } from 'react-icons/fa'

export default function SideBar() {
  return (
    <div className='flex flex-col h-full w-80 pt-20 bg-gray-600 bg-opacity-10'>
      <div className='relative flex flex-col mt-3 left-6'>
        <SideBarItem text={"My Units"} icon={<FaFile />} link={"/resources"} />
        <SideBarItem text={"Shared With Me"} icon={<FaUser />} link={""} />
        <SideBarItem text={"Starred"} icon={<FaStar />} link={""} />
        <SideBarItem text={"Recents"} icon={<FaClock />} link={""} />
      </div>
    </div>
  )
}
