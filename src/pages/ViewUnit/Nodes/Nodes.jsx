import React, { useState } from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import ViewUnit from './ViewUnit'
import SideBarNew from '../SideBar/SideBarNew'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import config from '../../../../config'
import Members from '../Members/Members'
import ViewMembers from '../Members/ViewMembers'
import ViewSettings from '../Settings/ViewSettings'

export default function Nodes() {

  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const [unit, setUnit] = useState();

  const params = useParams();

  const nav = useNavigate()

  const loadNodes = (id, search) => {
    setIsLoading(true);
    fetch(config.BASE_URL + `/units/${id}?${search && 'search=' + search}`, {
      method: "GET",
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }).then((res) => res.json())
      .then((response) => {
        setIsLoading(false)
        if (response.owner.username === JSON.parse(localStorage.getItem('user')).username) {
          setIsOwner(true)
        }
        setUnit(response)
      }).catch((err) => {
        nav(-1)
      });
  }

  useEffect(() => {
    loadNodes(params.id)
  }, [])

  return (
    <div className='h-[92%] w-full grid grid-cols-6 justify-items-stretch overflow-x-hidden'>

      <div className='border w-full h-full col-span-1'>
        <SideBarNew isOwner={isOwner} isLoading={isLoading} unitId={params.id} unitUsers={unit?.users} />
      </div>

      <div className='border w-full h-full col-span-5'>
        <Routes> 
          <Route path='/' element={<ViewUnit/>} />
          <Route path="/members" element={<ViewMembers/>} />
          <Route path="/settings" element={<ViewSettings/>} />
        </Routes>
      </div>
    </div>
  )
}
