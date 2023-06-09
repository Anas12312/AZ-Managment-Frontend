import React, { useState } from 'react'
import SideBarItem from '../../../components/SideBar/SideBarItem/SideBarItem'
import { FaStar, FaUser, FaFile, FaClock, FaPlus, FaCog } from 'react-icons/fa'
import InviteFromUnitModal from '../../../modals/InviteFromUnitModal'

export default function UnitSideBar({selected, unitId}) {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    return (
  
      <div className='flex flex-col h-full max-h-screen flex-grow w-72 pt-3 bg-gray-400 bg-opacity-10'>
        <InviteFromUnitModal isOpen={isInviteModalOpen} setIsOpen={setIsInviteModalOpen} />
        <div className='new-button' onClick={() => {setIsInviteModalOpen(true)}}
             title={"Invite Users"}
        >
          <FaPlus /> Invite
        </div>
        <div className='relative flex flex-col left-3 top-7'>
          {selected === 'resources'?(<SideBarItem id={"resources"} text={"Resources"} icon={<FaFile />} link={`/unit/${unitId}`} selected={true} />):(<SideBarItem id={"resources"} text={"Resources"} icon={<FaFile />} link={`/unit/${unitId}`} />)}
          {selected === 'members'?(<SideBarItem id={"members"} text={"Members"} icon={<FaUser />} link={`/unit/members/${unitId}`} selected={true} />):(<SideBarItem id={"members"} text={"members"} icon={<FaUser />} link={`/unit/members/${unitId}`} />)}
          {selected === 'settings'?(<SideBarItem id={"settings"} text={"Settings"} icon={<FaCog />} link={`/unit/settings/${unitId}`} selected={true} />):(<SideBarItem id={"settings"} text={"settings"} icon={<FaCog />} link={`/unit/settings/${unitId}`} />)}
        </div>
      </div>
    )
  }