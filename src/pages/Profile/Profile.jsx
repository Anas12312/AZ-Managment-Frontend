import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SideBar from './SideBar/SideBar';
import ViewProfile from './ViewProfile';

export default function Profile() {
  return (
    <div className='h-[92%] w-full grid grid-cols-6 justify-items-stretch overflow-x-hidden'>

      <div className='border w-full h-full col-span-1'>
        <SideBar />
      </div>

      <div className='border w-full h-full col-span-5'>
        <Routes> 
          <Route path='/' element={<ViewProfile/>} />
        </Routes>
      </div>
    </div>
  )
}
