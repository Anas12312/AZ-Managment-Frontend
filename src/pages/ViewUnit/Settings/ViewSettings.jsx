import React from 'react'
import { useParams } from 'react-router-dom'
import UnitSideBar from '../UnitSideBar/SideBar'

export default function ViewSettings() {
    const params = useParams()

    return (
        <div className='flex flex-row h-[99%] top-14'>
            <UnitSideBar selected={'settings'} unitId={params.id} />
            <div className='w-full'>
                Settings
            </div>
        </div>
    )
}
