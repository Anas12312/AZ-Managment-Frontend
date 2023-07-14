import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import config from '../../config'
import UnitSearchCard from '../components/UnitSearchCard'
import UnitSearchCardLoading from '../components/UnitSearchCardLoading'
import LoadingDefault from '../components/LoadingDefault'
export default function InviteFromProfile({setIsOpen, isOpen, _id:id, name, username, email}) {
    const closeModal = ()=>{
        setError("")
        setSelected(undefined)
        setIsOpen(false)
    }
    const [isLoading, setIsLoading] = useState(false)
    const [searchResults, setSearchResults] = useState()
    const [searchValue, setSearchValue] = useState("")
    const [isSearchLoading, setIsSearchLoading] = useState(true)
    const [selected, setSelected] = useState()
    const [error, setError] = useState("")
    const select = (id) => {
        const newResults = searchResults.map((unit)=>{
            if(unit._id === id) {
                setSelected(unit)
                if(unit.selected) {
                    unit.selected = false
                }else {
                    unit.selected = true
                }
            }else {
                unit.selected = false
            }
            return unit
        })
        setSearchResults(newResults)
    }
    const invite = () => {
        if(selected) {
            setError("")
            setIsLoading(true)
            fetch(config.BASE_URL + '/units/invite/' + id + '/' + selected._id, {
                method: 'POST',
                headers:  { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
                },
            })
            .then(res => {
                setIsLoading(false)
                setIsOpen(false)
                res.json()
            })
            .catch((e) => {

            }) 
        }else {
            setError("Please Select a Unit")
        }
    }
    const searchUsers = (search)=>{
        setSelected(undefined)
        if(search) {
            setIsSearchLoading(true)
            fetch(config.BASE_URL + '/units/search/' + search, {
                method: 'GET',
                headers:  { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
                },
            })
            .then(res => res.json())
            .then((response) => {
                setIsSearchLoading(false)
                setSearchResults(response.units)
            }).catch((e) => {

            }) 
        }else {
            getAllUnits()
        }
    }
    const getAllUnits = () => {
        setSelected(undefined)
        setIsSearchLoading(true)
        fetch(config.BASE_URL + '/units', {
            method: 'GET',
            headers:  { 
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem('token')
            },
        })
        .then(res => res.json())
        .then((response) => {
            setIsSearchLoading(false)
            setSearchResults(response.units)
        }).catch((e) => {

        }) 
    }
    useEffect(()=>{
        getAllUnits()

    },[])
  return (
    <div>
        <Modal
            appElement={document.getElementById('root')}
            isOpen={isOpen}
            className={'-translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-[30rem] w-[40rem] absolute flex flex-col justify-start items-center border p-5 rounded-md bg-secondary-2 text-black'}
            shouldFocusAfterRender={false}
            onRequestClose={closeModal}
        >
            {isLoading&&<LoadingDefault />}
            <div className='w-full pl-2 pt-2 text-lg'>Invite: <span className='font-bold'>{name}</span> <span className='font-light'>({username})</span></div>
            <div className='w-full p-2 pl-2 pt-2 text-lg'><span>Select A Unit:</span> <span className='text-base font-normal text-red-500'>{error}</span></div>
            <div className='w-full relative ml-2 mb-2'>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" value={searchValue} onChange={(e) => {
                    setSearchValue(e.target.value)
                    searchUsers(e.target.value)
                    }} className="block w-80 p-4 pl-10 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-1 focus:primary-1 " placeholder="Search Your Units..." autoComplete='off' required />
                </div>
            {!isSearchLoading?(
                    <div className='w-full p-2 border-2 rounded-md h-full overflow grid grid-cols-2 overflow-y-scroll ml-1'>
                        {searchResults.map((unit, index)=>{
                            return <UnitSearchCard key={index} {...unit} selectUnit={select} />
                        })}
                    </div>
                ):(
                    <div className='w-full p-2 border-2 rounded-md h-full overflow grid grid-cols-2 overflow-y-scroll ml-1'>
                        <UnitSearchCardLoading />
                        <UnitSearchCardLoading />
                        <UnitSearchCardLoading />
                        <UnitSearchCardLoading />
                        <UnitSearchCardLoading />
                        <UnitSearchCardLoading />
                    </div>
                )}
            <div className='absolute top-[10%] right-[10%] w-20 p-2 bg-primary-1 text-white
                                        rounded-md flex justify-center items-center shadow-lg
                                        hover:bg-primary-2 hover:cursor-pointer'
                             onClick={(e)=>{
                                invite()
                             }}>Invite</div>
        </Modal>
    </div>
  )
}
