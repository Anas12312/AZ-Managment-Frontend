import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaBell, FaQuestion, FaSignOutAlt } from 'react-icons/fa'
import config from '../../../config';
export default function NavBar({selected}) {
    const [notificationsNo, setNotificationsNo] = useState(2);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [user, setUser] = useState({});
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
          localStorage.removeItem("user")
          nav("/login")
        }else {
          alert("An Error Has Occured!")
        }
      })
    }
    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('user')))
      const ele = document.getElementById(selected);
      if(ele) {
        ele.classList.add("nav-bar-app-selected")
      }
      document.addEventListener("click", (e)=> {
        setShowNotifications(false)
        setShowProfile(false)
      })
    }, [])
  return (
    <div className='z-50 flex h-14 py-2 w-screen bg-gradient-to-l from-primary-2 to-50% to-accent-2 shadow-md justify-around items-center'>
        
        {/* LOGO */}
        <div className='hover:cursor-pointer fixed left-5 mb-5 text-xl flex flex-col justify-center items-center' onClick={() => {
            nav("/home")
        }}>
          <img src="../../../images/logo2.png" alt="" className='w-12 mt-5 ml-2'/>
        </div>
        
        {/* Apps */}
        <div className='flex items-center'>
            <div id="home"  className="nav-bar-app"  onClick={() => nav("/home")}>Home</div>
            <div id="files" className="nav-bar-app"  onClick={() => nav("/resources")}>Files</div>
            <div id="notes" className="nav-bar-app" >Notes</div>
            <div id="tasks" className="nav-bar-app" >Tasks</div>
        </div>

        {/* Right Icons */}
        <div className='fixed right-0 flex justify-around items-center p-2 w-36 '>
            <div id='notifications-btn' className="nav-bar-icon" title="Notifications" onClick={(e) => {
              e.stopPropagation()
              setShowNotifications(!showNotifications)
              setShowProfile(false)
            }}>
              {notificationsNo>0&&(
                <div className='absolute top-1 bg-red-500 left-1/4 w-4 h-4 border-2 border-red-500 rounded-full text-xs flex justify-center items-center'>{notificationsNo}</div>
              )}
              <FaBell />
            </div>
            <div id='profile-btn' className="nav-bar-icon" title="Profile" onClick={(e)=> {
              e.stopPropagation()
              setShowProfile(!showProfile)
              setShowNotifications(false)
            }}><FaQuestion /></div>
            <div className="nav-bar-icon" title="Logout" onClick={logout}><FaSignOutAlt /></div>
        </div>
        {/* Notificatinos */}
        {showNotifications&&(
          <div id="notifications" className='absolute top-[3.25rem] right-[6.75rem] w-[20rem] h-[20rem] shadow-lg border border-gray-200 bg-gray-100'
          onClick={(e)=>{
            e.stopPropagation()
          }}>

          </div>
        )}

        {/* Profile */}
        {showProfile&&(
          <div id="profile" className='absolute top-[3.25rem] right-[4.25rem] w-[15rem] h-[15rem]
                                       shadow-lg border border-gray-200 flex flex-col justify-center items-center'
                onClick={(e)=>{
                  e.stopPropagation()
                }}>
            <div className='bg-gray-100 h-1/3 w-full'></div>
            <div className='bg-gray-400 h-2/3 w-full flex flex-col pt-8 px-4'>
              <div>{user.name}</div>
              <div></div>
            </div>
            <div className='absolute top-6 w-20 h-20 rounded-full'>
              {user.imgUrl?(
              <div className='w-full h-full flex justify-center items-center
                             bg-primary-1 rounded-full text-2xl border-4
                             border-gray-100 text-white flex-shrink-0 flex-grow-0'><img className="object-contain w-full h-full rounded-full" src={user.imgUrl} />
              </div>):(
              <div className='w-full h-full flex justify-center
                             items-center bg-primary-1 rounded-full
                             text-2xl border-4 border-gray-100 
                             text-white'>{user.name[0].toUpperCase()}</div>)}
              </div>
            
          </div>
        )}
    </div>
    
  )
}
