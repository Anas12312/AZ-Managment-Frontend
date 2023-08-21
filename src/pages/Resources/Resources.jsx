import React from 'react'
import MyUnits from './Routes/MyUnits';
import StarredUnits from './Routes/StarredUnits';
import SideBar from './SideBar/SideBar';
import { Route, Routes } from 'react-router-dom';
import MyInvitations from './Routes/MyInvitations';

export default function Resources() {


  return (
    <div className='h-[92%] w-full grid grid-cols-6 justify-items-stretch overflow-x-hidden'>

      <div className='border w-full h-full col-span-1'>
        <SideBar />
      </div>

      <div className='border w-full h-full col-span-5'>
        <Routes> 
          <Route path='/' element={<MyUnits/>} />
          <Route path='/starred' element={<StarredUnits/>} />
          <Route path='/invitations' element={<MyInvitations/>} />
        </Routes>
      </div>
    </div>
  )
}
