import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import ViewSettings from './ViewSettings'

export default function Settings() {
  return (
    <div className='flex h-screen w-screen flex-col overflow-hidden'>
        <NavBar selected={"files"}/>
        <ViewSettings />
    </div>
  )
}
