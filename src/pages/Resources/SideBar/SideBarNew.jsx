import React from 'react'
import UnitModal from '../../../modals/UnitModal'
import { FaClock, FaFile, FaPlus, FaStar, FaUser } from 'react-icons/fa'
import SideBarItem from '../../../components/SideBar/SideBarItem/SideBarItem'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function SideBarNew({ selected }) {
    const [newUnitModalIsOpen, setNewUnitModalIsOpen] = useState(false);

    return (
        <div className='flex flex-col h-full  pt-3 bg-gray-400 bg-opacity-10'>
            {/* New Unit Modal */}
            <UnitModal
                isEdit={false}
                isOpen={newUnitModalIsOpen}
                setIsOpen={setNewUnitModalIsOpen}
            />
            <div className='absolute top-20 left-4'>
                <div className='new-button' onClick={() => { setNewUnitModalIsOpen(true) }}>
                    <FaPlus /> New
                </div>
            </div>
            
            <div className='relative flex flex-col left-3 top-20'>
                <NavLink to={'/resources'} end className={({isActive, isPending}) => isActive ? 'side-bar-item side-bar-item-selected': 'side-bar-item'}>
                    <div className='fixed left-6'><FaFile/></div>
                    <div className='fixed left-12'>Units</div>
                </NavLink>

                <NavLink to={'/resources/starred'} className={({isActive, isPending}) => isActive ? 'side-bar-item side-bar-item-selected': 'side-bar-item'}>
                    <div className='fixed left-6'><FaStar/></div>
                    <div className='fixed left-12'>Starred</div>
                </NavLink>

                <NavLink to={'/resources/invitations'} className={({isActive, isPending}) => isActive ? 'side-bar-item side-bar-item-selected': 'side-bar-item'}>
                    <div className='fixed left-6'><FaUser/></div>
                    <div className='fixed left-12'>Invitations</div>
                </NavLink>
            </div>
        </div>
    )
}
