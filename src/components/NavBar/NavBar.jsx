import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaBell, FaQuestion } from 'react-icons/fa'
import config from '../../../config';
export default function NavBar({selected}) {
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
    useEffect(() => {
      const ele = document.getElementById(selected);
      if(ele) {
        ele.classList.add("nav-bar-app-selected")
      }
    }, [])
  return (
    <div className='flex h-14 w-screen bg-gradient-to-l from-primary-2 to-50% to-accent-2 shadow-md justify-around items-center'>
        {/* LOGO */}
        <div className='hover:cursor-pointer fixed left-5 mb-5 text-xl flex flex-col justify-center items-center' onClick={() => {
            nav("/home")
        }}>
          <img src="../../../images/logo2.png" alt="" className='w-12 mt-5 ml-2'/>
        </div>
        {/* Apps */}
        <div className='flex items-center'>
            <div id="home" className="nav-bar-app" title="Logout" onClick={() => nav("/home")}>Home</div>
            <div id="files" className="nav-bar-app" title="Logout" onClick={() => nav("/resources")}>Files</div>
            <div id="notes" className="nav-bar-app" title="Logout">Notes</div>
            <div id="tasks" className="nav-bar-app" title="Logout" onClick={logout}>Tasks</div>
        </div>
        {/* Right Icons */}
        <div className='fixed right-0 flex justify-around items-center p-2 w-36 '>
            <div className="nav-bar-icon" title="Logout"><FaBell /></div>
            <div className="nav-bar-icon" title="Logout"><FaQuestion /></div>
            <div className="nav-bar-icon" title="Logout" onClick={logout}>C</div>
        </div>
    </div>
    
  )
}
