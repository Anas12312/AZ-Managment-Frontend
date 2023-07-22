import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import Card from '../../components/Card'
import config from '../../../config';
import Pagination from '../../components/Pagination';
import LoadingCard from '../../components/LoadingCard';
import MyUnits from './Routes/MyUnits';
import StarredUnits from './Routes/StarredUnits';
import SideBarNew from './SideBar/SideBarNew';
import { Route, Routes } from 'react-router-dom';
import MyInvitations from './Routes/MyInvitations';

export default function Resources() {


  return (
    <div className='h-[92%] w-full grid grid-cols-6 justify-items-stretch overflow-x-hidden'>

      <div className='border w-full h-full col-span-1'>
        <SideBarNew />
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
