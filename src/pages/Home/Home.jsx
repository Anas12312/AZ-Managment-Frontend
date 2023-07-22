import React, { useEffect, useState } from 'react'
import config from '../../../config'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [isAuth, setIsAuth] = useState(false)
  const nav = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("token")) {
      setIsAuth(true)
    }else {
      setIsAuth(false)
      nav("/login")
    }
  },[])
  return (
    <>
      <div className='flex w-screen flex-col'>
        <div className='flex flex-row h-full'>  
          <div className='w-full'>Home</div>
        </div>
      </div>
    </>
  )
}
