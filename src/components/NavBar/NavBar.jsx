import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaBell, FaQuestion } from 'react-icons/fa'
import config from '../../../config';
export default function NavBar() {
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
  return (
    <div className='flex h-14 w-screen bg-gradient-to-l from-primary-2 to-50% to-accent-2 shadow-md justify-between items-center'>
        {/* LOGO */}
        <div className='hover:cursor-pointer fixed left-16 ml-3 mb-5 text-xl flex flex-col justify-center items-center' onClick={() => {
            nav("/home")
        }}>
          <img src="../../../images/logo2.png" alt="" className='w-14 mt-5 ml-2'/>
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
