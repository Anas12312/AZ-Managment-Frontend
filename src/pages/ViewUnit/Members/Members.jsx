import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import ViewMembers from './ViewMembers'

export default function Members() {
    return (
        <div className='flex h-screen w-screen flex-col overflow-hidden'>
            <NavBar selected={"files"} />
            <ViewMembers />
        </div>
    )
}
