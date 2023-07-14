import React, { useState } from 'react'
import SideBarItem from './SideBarItem/SideBarItem'
import { FaStar, FaUser, FaFile, FaClock, FaPlus } from 'react-icons/fa'
import UnitModal from '../../modals/UnitModal';


export default function SideBar({selected}) {
  
  const [newUnitModalIsOpen, setNewUnitModalIsOpen] = useState(false);

  return (

    <div className='flex flex-col h-full max-h-screen flex-grow w-72 pt-3 bg-gray-400 bg-opacity-10'>
      {/* New Unit Modal */}
      <UnitModal 
        isEdit = {false} 
        isOpen={newUnitModalIsOpen}
        setIsOpen={setNewUnitModalIsOpen}
      />
      <div className='new-button' onClick={() => {setNewUnitModalIsOpen(true)}}>
        <FaPlus /> New
      </div>
      <div className='relative flex flex-col left-3 top-7'>
        {selected === 'my-units'?(<SideBarItem id={"my-units"} text={"My Units"} icon={<FaFile />} link={"/resources"} selected={true} />):(<SideBarItem id={"my-units"} text={"My Units"} icon={<FaFile />} link={"/resources"} />)}
        {selected === 'starred'?(<SideBarItem id={"starred"} text={"Starred"} icon={<FaStar />} link={"/resources/starred"} selected={true} />):(<SideBarItem id={"starred"} text={"Starred"} icon={<FaStar />} link={"/resources/starred"} />)}
        {selected === 'invitations'?(<SideBarItem id={"invitations"} text={"Invitations"} icon={<FaUser />} link={"/resources/invitations"} selected={true} />):(<SideBarItem id={"Invitations"} text={"Invitations"} icon={<FaUser />} link={"/resources/invitations"} />)}
        {selected === 'recent'?(<SideBarItem id={"recent"} text={"Recents"} icon={<FaClock />} link={""} selected={true} />):(<SideBarItem id={"recent"} text={"Recents"} icon={<FaClock />} link={""} />)}
      </div>
    </div>
  )
}
