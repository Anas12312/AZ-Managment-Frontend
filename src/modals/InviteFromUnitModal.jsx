import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'
import NoResults from '../components/NavBar/SearchResult/NoResults'
import LoadingSearchResult from '../components/NavBar/SearchResult/LoadingSearchResult'
import SearchResult from '../components/NavBar/SearchResult/SearchResult'
import config from '../../config'
import { useNavigate } from 'react-router-dom'
export default function InviteFromUnitModal({ setIsOpen, isOpen, unitId, unitUsers }) {

    const nav = useNavigate()

    const [searchResults, setSearchResults] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isSearchLoading, setIsSearchLoading] = useState(false)

    const [selectedUsers, setSelectedUsers] = useState([])

    const closeModal = () => {
        setSearchValue('')
        setShowSearchResults(false)
        setSearchResults([])
        setSelectedUsers([])
        setIsOpen(false)
    }

    const filterResult = (results) => {
        let filteredSearchResult = results;

        selectedUsers.forEach(user => {
            filteredSearchResult = filteredSearchResult.filter(search => search._id !== user._id)
        })

        unitUsers.forEach(user => {
            filteredSearchResult = filteredSearchResult.filter(search => search._id !== user._id)
        })

        return filteredSearchResult
    }

    const searchUsers = (search) => {
        if (search !== undefined && search !== null) {
            if (search) {
                setIsSearchLoading(true)
                fetch(config.BASE_URL + `/users?search=${search}` )
                    .then((res) => res.json())
                    .then((response) => {
                        setSearchResults(filterResult(response))
                        setIsSearchLoading(false)
                    })
            } else {
                setIsSearchLoading(true)
                setSearchResults([])
            }
        }
    }

    const inviteUsers = () => {
        fetch(config.BASE_URL + `/units/invite-many/${unitId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                invitedUserIds: selectedUsers.map(user => user._id)
            })
        }).then(res => {
           nav(0)
        })
    }


    return (
        <div>
            <Modal
                appElement={document.getElementById('root')}
                isOpen={isOpen}
                className={'shadow-xl shadow-slate-300 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-1/3 absolute flex flex-col justify-around items-center border p-5 rounded-md bg-secondary-2 text-black'}
                shouldFocusAfterRender={false}
                onRequestClose={closeModal}
                closeTimeoutMS={200}
            >
                <div className='text-2xl font-light'>
                    <span>Invite Users</span>
                </div>

                {/* Search */}
                <div className='relative w-full my-2 mb-4' onClick={(e) => e.stopPropagation()}>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        value={searchValue}
                        onBlur={() => {
                            setTimeout(() => {
                                setShowSearchResults(false)
                            }, 300)
                        }}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                            setShowSearchResults(true)
                            searchUsers(e.target.value)
                        }}
                        onClick={(e) => {
                            searchResults.length > 0 && setShowSearchResults(true)
                        }}
                        className="block w-full p-4 pl-10 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-1 focus:primary-1 " placeholder="Search Users..." autoComplete='off' required />
                    {/* Search Results */}
                    {showSearchResults && (!isSearchLoading ? (searchResults.length > 0 ? (
                        <div className='z-10 absolute border border-gray-600 w-full left-0 top-14 px-1 rounded-md bg-gray-200 shadow'>
                            {searchResults.map((result, index) => <SearchResult onClick={(e) => {
                                e.stopPropagation()
                                setSearchValue('')
                                setShowSearchResults(false)
                                setSearchResults([])
                                setSelectedUsers(selectedUsers.concat(result))
                            }} key={index} {...result} setShowSearchResults={setShowSearchResults} />)}
                        </div>
                    ) : (
                        <div className=' z-10 absolute border border-gray-600 w-full left-0 top-14 px-1 rounded-md bg-gray-200 shadow'>
                            <NoResults />
                        </div>)) : (
                        <div className=' z-10 absolute border border-gray-600 w-full left-0 top-14 px-1 rounded-md bg-gray-200 shadow'>
                            <LoadingSearchResult />
                        </div>
                    ))}
                </div>

                <div className='flex flex-col justify-start items-center border px-2 py-4 mt-4  rounded-md w-full'>
                    {selectedUsers.map((user, index) =>
                        <div className='relative w-[95%] h-16 pl-4 flex justify-start gap-64 my-1 items-center border-2 rounded-md' key={index}>

                            <div className='absolute w-12 h-12 flex justify-center items-center rounded-full border-4 border-white'>
                                <img
                                    id='profile-pic'
                                    className='object-cover w-full h-full flex-shrink-0 rounded-full'
                                    src={user.imgUrl ? user.imgUrl : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                    onError={() => { document.getElementById(`profile-pic`).src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
                                />
                            </div>

                            <div className='absolute left-20 flex flex-col justify-around w-full text-blue-900'>
                                <div>
                                    <span className='text-sm font-bold'>{user.name} </span>
                                    <span className='text-sm font-light'>({user.username})</span>
                                </div>
                                <span className='text-sm font-light text-black'>{user.email}</span>
                            </div>

                            <div className='absolute right-6' onClick={(e) => {
                                e.stopPropagation()
                                const newSelectedUsers = selectedUsers.filter(userArr => userArr._id !== user._id)
                                setSelectedUsers(newSelectedUsers)
                            }}>
                                <span className='text-red-700 text-sm font-bold select-none cursor-pointer hover:underline '>Remove</span>
                            </div>

                        </div>
                    )}
                </div>

                <div className='w-full mt-2'>
                    <button className="w-full  h-9 rounded-md border text-sm bg-primary-2 text-white hover:bg-primary-1"
                        onClick={inviteUsers}
                    >Invite</button>
                </div>
            </Modal>
        </div>
    )
}
