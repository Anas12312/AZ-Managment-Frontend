import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import ViewUnit from '../ViewUnit'

export default function Nodes() {
  return (
    <div className='flex h-screen w-screen flex-col overflow-hidden'>
        <NavBar selected={"files"}/>
        <ViewUnit />
    </div>
  )
}
