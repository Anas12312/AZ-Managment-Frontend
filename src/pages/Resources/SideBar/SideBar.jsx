import React from 'react'
import SideBarItem from './SideBarItem/SideBarItem'
import { FaCube } from 'react-icons/fa'

export default function SideBar() {
  return (
    <div className='flex flex-col h-full w-80 bg-gradient-to-t from-primary-2 to-85% to-accent-2 text-white pt-20'>
      <div className='flex justify-start items-center pt-3 font-bold text-xl'><span className='relative left-5'>Apps</span></div>
      <div className='flex flex-col mt-3'>
        <SideBarItem text={"Resources"} icon={<FaCube />} link={"/resources"} />
        <SideBarItem text={"123123123"} icon={<FaCube />} link={""} />
        <SideBarItem text={"123123123"} icon={<FaCube />} link={""} />
        <SideBarItem text={"123123123"} icon={<FaCube />} link={""} />
        <SideBarItem text={"123123123"} icon={<FaCube />} link={""} />
      </div>
    </div>
  )
}
