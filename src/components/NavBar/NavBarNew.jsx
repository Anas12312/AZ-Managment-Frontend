import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import config from '../../../config';
import SearchResult from './SearchResult/SearchResult';
import NoResults from './SearchResult/NoResults';
import LoadingSearchResult from './SearchResult/LoadingSearchResult';
import { FaBell, FaSignOutAlt, FaWrench } from 'react-icons/fa';
import Notification from './Notifications/Notification';

import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingNotification from './Notifications/LoadingNotification';
import LoadingMoreNotifications from './Notifications/LoadingMoreNotifications';


export default function NavBarNew({reloadNavBar}) {


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
    const [lastScrollTop, setLastScrollTop] = useState(0)
    const [loadingMoreNotifications, setLoadingMoreNotifications] = useState(false)
    const [nextNotifications, setNextNotifications] = useState(false)
    const [nextNotificationsLoading, setNextNotificationsLoading] = useState(false)
    const nav = useNavigate();

    const [isLogedIn, setIsLogedIn] = useState(true);


    const getNotifications = () => {
        setNotificationsLoading(true)
        fetch(config.BASE_URL + `/notifications?page=0&limit=7`, {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        .then((res) => res.json())
        .then((response) => {
            setNotifications(response.notifications)
            setNextNotifications(response.next)
            setNotificationsLoading(false)
        })
    }
    const getNextNotifications = () => {
        if(nextNotifications) {
            setNextNotificationsLoading(true)
            fetch(config.BASE_URL + nextNotifications, {
                method: "GET",
                headers:
                {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            })
            .then((res) => res.json())
            .then((response) => {
                setNotifications([...notifications, ...response.notifications])
                setNextNotifications(response.next)
                setNextNotificationsLoading(false)
            })
        }
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
                if (response.count > 9) {
                    setNotificationsNo('+9')
                } else {
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
                setIsLogedIn(false)
                nav("/login")
            } else {
                alert("An Error Has Occured!")
            }
        })
    }
    useEffect(() => {
        
        const localUser = JSON.parse(localStorage.getItem('user'));

        if(!localUser) {
            setIsLogedIn(false);
            nav('/')
        }
        
        setUser(localUser)

        document.addEventListener("click", (e) => {
            setShowNotifications(false)
            setShowProfile(false)
            setShowSearchResults(false)
            setSearchValue("")
        })
        getNotificationsCount()

    }, [reloadNavBar])

    return (
        <div className='z-50'>
            {
                isLogedIn && (
                    <div className=' z-50 flex h-[7%] py-2 w-screen bg-gradient-to-l from-primary-2 to-50% to-accent-2 shadow-md justify-around items-center'>
            {/* LOGO */}
            <Link className='hover:cursor-pointer fixed left-5 mb-5 text-xl flex flex-col justify-center items-center'
                to={'/home'}
            >
                <img src="../../../images/logo2.png" alt="" className='w-12 mt-5 ml-2' />
            </Link>

            {/* Apps Nav */}
            <div className='-translate-x-1/2 flex items-center'>
                <NavLink to={'/home'} className={({ isActive, isPending }) => isActive ? 'nav-bar-app nav-bar-app-selected' : 'nav-bar-app'}>Home</NavLink>
                <NavLink to={'/resources'} className={({ isActive, isPending }) => isActive ? 'nav-bar-app nav-bar-app-selected' : 'nav-bar-app'}>Files</NavLink>
                <NavLink to={'/home'} className='nav-bar-app'>Notes</NavLink>
                <NavLink to={'/home'} className='nav-bar-app'>Tasks</NavLink>
            </div>

            {/* Search */}
            <div className='z-50 fixed right-52' onClick={(e) => e.stopPropagation()}>
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
                    <div className='z-50 absolute border border-gray-600 w-80 left-0 top-14 px-1 rounded-md bg-gray-200 shadow'>
                        {searchResults.map((result, index) => <SearchResult key={index} onClick={() => {
                            setShowSearchResults(false)
                            nav('/profile/' + result.username)
                            nav(0)
                        }} {...result} setShowSearchResults={setShowSearchResults} />)}
                    </div>
                ) : (
                    <div className='z-50 absolute border border-gray-600 w-80 left-0 top-14 px-1 rounded-md bg-gray-200 shadow'>
                        <NoResults />
                    </div>)) : (
                    <div className='z-50 absolute border border-gray-600 w-80 left-0 top-14 px-1 rounded-md bg-gray-200 shadow'>
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
                            text-white'>{user.name && user.name[0].toUpperCase()}
                        </div>)}
                </div>
                <div id='notifications-btn' className="nav-bar-icon" title="Notifications" onClick={(e) => {
                    e.stopPropagation()
                    if(!showNotifications) {
                        setNotificationsNo(0)
                    }else {
                        getNotificationsCount()

                    }
                    setLastScrollTop(0)
                    setShowNotifications(!showNotifications)
                    setShowProfile(false)
                    getNotifications()
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
                <div id="notifications" className='z-50 absolute top-[3.75rem] right-[4.25rem] w-[20rem] h-[24rem] shadow-lg border border-gray-200 bg-gray-100 rounded-lg pt-2 px-1 overflow-y-auto'
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    onScroll={(e) => {
                        if (e.target.scrollTop < lastScrollTop){
                            // upscroll 
                            return;
                        } 
                        setLastScrollTop(e.target.scrollTop <= 0 ? 0 : e.target.scrollTop);
                        if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight ){
                            if(!nextNotificationsLoading) {
                                getNextNotifications()
                            }
                        }
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
                            {nextNotificationsLoading ? <LoadingMoreNotifications />:(<div className='w-full h-10 flex justify-center items-center font-light text-lg'>End of Notifications</div>)}
                        </div>
                    ):(
                        <LoadingNotification />
                    )}
                </div>
            )}

            {/* Profile */}
            {showProfile && (
                <div id="profile" className='z-50 absolute top-[3.75rem] right-[6.75rem] w-[15rem] h-[18rem] rounded-2xl
                                       shadow-lg border border-gray-200 flex flex-col justify-center items-center'
                    onClick={(e) => {
                        e.stopPropagation()
                    }}>
                    <div className='bg-slate-50 h-full w-full flex flex-col rounded-xl' >
                        {/* Image and Name */}
                        <div className='flex flex-row'>
                            <div className='top-2 left-1 w-16 h-16 rounded-full hover:cursor-pointer m-2' onClick={() => {
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
                            <div className='mt-2 h-16 flex flex-col justify-start pt-2 '>
                                <div className='text-sm font-bold hover:cursor-pointer'
                                    onClick={() => {
                                        nav('/profile')
                                        nav(0)
                                    }}>
                                    {user.name}
                                </div>
                                <div className='text-xs'>
                                    {user.email}
                                </div>
                            </div>
                        </div>
                        {/* Profile Button */}
                        <div className='w-full flex justify-center border-b-2 pb-3'>
                            <div className='w-[95%] border border-blue-600 h-6 flex
                                            justify-center items-center rounded-full
                                            text-sm text-blue-600 hover:border-2
                                            hover:bg-blue-400 hover:text-white hover:cursor-pointer trans select-none'
                                onClick={() => {nav('/profile');nav(0)}}
                                            >
                                View Profile
                            </div>
                        </div>
                        {/* Services */}
                        <div className='w-full flex flex-col justify-left m-1 border-b-2'>
                            <div className='text-sm font-bold'>
                                Services
                            </div>
                            {/* List */}
                            <div className='w-full flex flex-col justify-left m-1'>
                                <div className='text-sm hover:underline hover:cursor-pointer'
                                        onClick={() => {
                                            nav('/resources/invitations')
                                            nav(0)
                                        }}>
                                    Invitations
                                </div>
                                <div className='text-sm hover:underline hover:cursor-pointer'onClick={() => {
                                            nav('/resources')
                                            nav(0)
                                        }}>
                                        My Units
                                </div>
                                <div className='text-sm hover:underline hover:cursor-pointer'>
                                    Notes
                                </div>
                            </div>
                        </div>
                        {/* Account */}
                        <div className='w-full flex flex-col justify-left mx-1'>
                            <div className='text-sm font-bold'>
                                Account
                            </div>
                            {/* List */}
                            <div className='w-full flex flex-col justify-left m-1'>
                                <div className='text-sm hover:underline hover:cursor-pointer'>
                                    Help
                                </div>
                                <div className='text-sm hover:underline hover:cursor-pointer'
                                onClick={logout}
                                >
                                    Sign Out
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
                )
            }
        </div>
    )
}
