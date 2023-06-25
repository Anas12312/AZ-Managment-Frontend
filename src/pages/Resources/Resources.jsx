import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'

export default function Resources() {
  return (
    <div className='flex h-screen w-screen flex-col'>
        <NavBar selected={"files"}/>
        <div className='flex flex-row h-full'>  
            <SideBar />
            <div className='w-full'>
              Res
            </div>
        </div>
    </div>
  )
}
