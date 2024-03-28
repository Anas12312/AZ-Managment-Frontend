import React, { useEffect, useState } from 'react'
import SideBar from './SideBar copy/SideBar'
import { useNavigate } from 'react-router-dom'
import RecentlyViewed from './RecentlyViewed/RecentlyViewed'
import Card from './Card'

export default function Home() {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState({})
  const nav = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("token")) {
      setIsAuth(true)
      const localUser = JSON.parse(localStorage.getItem('user'));
      setUser(localUser)
    }else {
      setIsAuth(false)
      nav("/login")
    }
  },[])
  return (
    <div className='h-[92%] w-full grid grid-cols-6 justify-items-stretch overflow-x-hidden'>

      <div className='border w-full h-full col-span-1'>
        <SideBar name={user.name} imgUrl={user.imgUrl} />
      </div>

      <div className='border w-full h-full col-span-5 flex'>
        <div className='h-full w-full flex justify-center pt-10'>
          <Card />
        </div>
        <div className='h-full border-l w-[65%] p-5'>
          <RecentlyViewed />
        </div>
      </div>
    </div>
  )
}
