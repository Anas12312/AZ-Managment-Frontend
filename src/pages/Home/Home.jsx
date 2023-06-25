import React, { useEffect, useState } from 'react'
import config from '../../../config'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [isAuth, setIsAuth] = useState(false)
  const nav = useNavigate();
  const logout = () => {
    const url = config.BASE_URL + "/account/logout"
    fetch(url, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then((response) => {
      if(response.status === 200) {
        localStorage.removeItem("token")
        nav("/login")
      }else {
        alert("An Error Has Occured!")
      }
    })
  }
  useEffect(()=>{
    if(localStorage.getItem("token")) {
      setIsAuth(true)
    }else {
      setIsAuth(false)
      nav("/login")
    }
    console.log(isAuth)
  },[])
  return (
    <>
      {isAuth && (
        <div className='flex h-screen w-screen flex-col'>
          <NavBar selected={"home"}/>
          <div className='flex flex-row h-full'>  
              
            <div className='w-full'>Home</div>
          </div>
        </div>
      )}
    </>
  )
}
