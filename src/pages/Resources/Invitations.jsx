import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import MyInvitations from './MyInvitations/MyInvitations'

export default function Invitations() {
  return (
    <div className='flex h-screen w-screen flex-col overflow-hidden'>
        <NavBar selected={"files"}/>
        <MyInvitations />
    </div>
  )
}
