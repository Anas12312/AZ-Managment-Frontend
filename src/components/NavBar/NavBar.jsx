import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaBell, FaQuestion, FaSignOutAlt, FaWrench } from 'react-icons/fa'
import config from '../../../config';
import SearchResult from './SearchResult/SearchResult';
import LoadingSearchResult from './SearchResult/LoadingSearchResult';
import NoResults from './SearchResult/NoResults';
import Notification from './Notifications/Notification';
export default function NavBar({ selected }) {
  const [notifications, setNotifications] = useState([])
  const [notificationsNo, setNotificationsNo] = useState('.');
  const [notificationsPageNo, setNotificationsPageNo] = useState(0)
  const [notificationsLoading, setNotificationsLoading] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [user, setUser] = useState({});
  const nav = useNavigate();

  const getNotifications = (page) => {
    setNotificationsLoading(true)
    fetch(config.BASE_URL + `/notifications?page=${page}&limit=7`, {
      method: "GET",
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
    .then((res) => res.json())
    .then((response) => {
      setNotifications(response)
      setNotificationsLoading(false)
    })
  }
  const getNotificationsCount = () => {
    fetch(config.BASE_URL + `/notifications/count`, {
      method: "GET",
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
    .then((res) => res.json())
    .then((response) => {
      if(response.count > 9) {
        setNotificationsNo('+9')
      }else {
        setNotificationsNo(response.count)
      }
    })
  }
  const searchUsers = (search) => {
    if (search !== undefined && search !== null) {
      if (search) {
        setIsSearchLoading(true)
        fetch(config.BASE_URL + '/users?search=' + search)
          .then((res) => res.json())
          .then((response) => {
            setSearchResults(response)
            setIsSearchLoading(false)
          })
      } else {
        setIsSearchLoading(true)
        setSearchResults([])
      }
    }
  }
  const logout = () => {
    const url = config.BASE_URL + "/account/logout"
    fetch(url, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        nav("/login")
      } else {
        alert("An Error Has Occured!")
      }
    })
  }
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
    const ele = document.getElementById(selected);
    if (ele) {
      ele.classList.add("nav-bar-app-selected")
    }
    document.addEventListener("click", (e) => {
      setShowNotifications(false)
      setShowProfile(false)
      setShowSearchResults(false)
      setSearchValue("")
    })
    getNotificationsCount()

  }, [])
  return (
    <div className=' z-50 flex h-14 py-2 w-screen bg-gradient-to-l from-primary-2 to-50% to-accent-2 shadow-md justify-around items-center'>

      {/* LOGO */}
      <div className='hover:cursor-pointer fixed left-5 mb-5 text-xl flex flex-col justify-center items-center' onClick={() => {
        nav("/home")
      }}>
        <img src="../../../images/logo2.png" alt="" className='w-12 mt-5 ml-2' />
      </div>

      {/* Apps */}
      <div className='-translate-x-1/2 flex items-center'>
        <div id="home" className="nav-bar-app" onClick={() => nav("/home")}>Home</div>
        <div id="files" className="nav-bar-app" onClick={() => { nav("/resources"); nav(0) }}>Files</div>
        <div id="notes" className="nav-bar-app" >Notes</div>
        <div id="tasks" className="nav-bar-app" >Tasks</div>
      </div>

      {/* Search */}
      <div className='fixed right-52' onClick={(e) => e.stopPropagation()}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="search" id="default-search" value={searchValue} onChange={(e) => {
          console.log(e.target.value)
          setSearchValue(e.target.value)
          setShowSearchResults(true)
          searchUsers(e.target.value)
        }} className="block w-80 p-4 pl-10 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-1 focus:primary-1 " placeholder="Search Users..." autoComplete='off' required />
        {/* Search Results */}
        {showSearchResults && (!isSearchLoading ? (searchResults.length > 0 ? (
          <div className='absolute border border-gray-600 w-80 left-0 top-14 px-1 rounded-md bg-gray-200 shadow'>
            {searchResults.map((result, index) => <SearchResult key={index} onClick={() => {
              setShowSearchResults(false)
              nav('/profile/' + result.username)
              nav(0)
            }} {...result} setShowSearchResults={setShowSearchResults} />)}
          </div>
        ) : (
          <div className='absolute border border-gray-600 w-80 left-0 top-14 px-1 rounded-md bg-gray-200 shadow'>
            <NoResults />
          </div>)) : (
          <div className='absolute border border-gray-600 w-80 left-0 top-14 px-1 rounded-md bg-gray-200 shadow'>
            <LoadingSearchResult />
          </div>
        ))}
      </div>
      {/* Right Icons */}
      <div className='fixed right-0 flex justify-around items-center p-2 w-36'>
        
        <div id='profile-btn' className="nav-bar-photo" title="Profile" onClick={(e) => {
          e.stopPropagation()
          setShowProfile(!showProfile)
          setShowNotifications(false)
        }}>
          {user.imgUrl ? (
            <div className='w-full h-full flex justify-center items-center
                            bg-primary-1 rounded-full
                            flex-shrink-0 flex-grow-0'><img className="object-cover w-full h-full rounded-full" src={user.imgUrl} />

            </div>) : (
            <div className='w-full h-full flex justify-center
                            items-center bg-transparent rounded-full
                            text-lg
                            text-white'>{user.name&&user.name[0].toUpperCase()}
            </div>)}
        </div>
        <div id='notifications-btn' className="nav-bar-icon" title="Notifications" onClick={(e) => {
          e.stopPropagation()
          setShowNotifications(!showNotifications)
          setShowProfile(false)
          getNotifications(notificationsPageNo)
        }}>
          {notificationsNo > 0 && (
            <div className='absolute top-1 bg-red-500 left-[53%] w-5 h-5 font-bold border-2 border-red-500 rounded-full text-xs flex justify-center items-start'>{notificationsNo}</div>
          )}
          <FaBell />
        </div>
        <div className="nav-bar-icon" title="Logout" onClick={logout}><FaSignOutAlt /></div>
      </div>
      {/* Notificatinos */}
      {showNotifications && (
        <div id="notifications" className='absolute top-[3.75rem] right-[4.25rem] w-[20rem] h-[24rem] shadow-lg border border-gray-200 bg-gray-100 rounded-lg pt-2 px-1 overflow-y-auto'
          onClick={(e) => {
            e.stopPropagation()
          }}>
            {!notificationsLoading?(
              <div className='px-1'>
                <div className='w-full flex justify-between items-center h-10 border-b-2 mb-2'>
                  <div>Notifications</div>
                  <div className='w-7 h-7 rounded-full flex justify-center items-center bg-black bg-opacity-0 hover:cursor-pointer hover:bg-opacity-20'><FaWrench /></div>
                </div>
                {notifications.map((notification, index) => {
                  return <Notification key={index} {...notification} />
                })}
              </div>
            ):(
              <div>Loading</div>
            )}
        </div>
      )}

      {/* Profile */}
      {showProfile && (
        <div id="profile" className='absolute top-[3.75rem] right-[6.75rem] w-[15rem] h-[15rem]
                                       shadow-lg border border-gray-200 flex flex-col justify-center items-center'
          onClick={(e) => {
            e.stopPropagation()
          }}>
          <div className='bg-gray-100 h-1/3 w-full'></div>
          <div className='bg-gray-400 h-2/3 w-full flex flex-col pt-8 px-4'>
            <div>{user.name}</div>
            <div></div>
          </div>
          <div className='absolute top-6 w-20 h-20 rounded-full hover:cursor-pointer' onClick={() => {
            nav('/profile')
            nav(0)
          }}>
            {user.imgUrl ? (
              <div className='w-full h-full flex justify-center items-center
                             bg-primary-1 rounded-full text-2xl border-4
                             border-gray-100 text-white flex-shrink-0 flex-grow-0'><img className="object-cover w-full h-full rounded-full" src={user.imgUrl} />

              </div>) : (
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
