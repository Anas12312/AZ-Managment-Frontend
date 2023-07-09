import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import Card from '../../components/Card'
import config from '../../../config';
import Pagination from '../../components/Pagination';
import LoadingCard from '../../components/LoadingCard';
import MyUnits from './MyUnits/MyUnits';
import StarredUnits from './StarredUnits/StarredUnits';

export default function Starred() {
  
  
  return (
    <div className='flex h-screen w-screen flex-col overflow-hidden'>
        <NavBar selected={"files"}/>
        <StarredUnits />
    </div>
  )
}
