import React, { useEffect, useState } from 'react'
import SideBar from '../../../components/SideBar/SideBar'
import LoadingInvitationCard from '../../../components/Invitation/LoadingInvitationCard'
import InvitationCard from '../../../components/Invitation/InvitationCard'
import config from '../../../../config'

export default function MyInvitations() {
    const [isLoading, setIsLoading] = useState(true)
    const [invitations, setInvitations] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [searchedInvitations, setSearchedInvitations] = useState([])
    const getMyInvitations = () => {
        setIsLoading(true)
        fetch(config.BASE_URL + '/invitations', {
            method: 'GET',
            headers:  { 
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem('token')
            },
        })
        .then(res => res.json())
        .then((response) => {
            setInvitations(response)
            setIsLoading(false)
        }).catch((e) => {

        }) 
    }
    useEffect(()=>{
        setSearchValue("")
        setSearchedInvitations(invitations)
    },[invitations])
    useEffect(()=>{
        getMyInvitations()
    },[])
    const searchInvitations = (search) => {
        const results = invitations.filter((invitation) => {
            const nameMatch = invitation.invitedBy.name.toLowerCase().includes(search.toLowerCase().trim())
            const usernameMatch = invitation.invitedBy.username.toLowerCase().includes(search.toLowerCase().trim())
            const emailMatch = invitation.invitedBy.email.toLowerCase().includes(search.toLowerCase().trim())
            const unitMatch = invitation.unit.name.toLowerCase().includes(search.toLowerCase().trim())
            return nameMatch || emailMatch || usernameMatch || unitMatch
        })
        setSearchedInvitations(results)
    }
  return (
    <div className='flex flex-row h-screen'>  
        <SideBar selected={"invitations"} />
        {!isLoading?(
            <div className='w-full relative'>
                <div className='p-5 text-4xl font-bold ml-6'>Invitations</div>
                <div className='relative ml-10'>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" value={searchValue} onChange={(e) => {
                        setSearchValue(e.target.value)
                        searchInvitations(e.target.value)
                        }} className="block w-80 p-4 pl-10 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-1 focus:primary-1 " placeholder="Search Your Invitations..." autoComplete='off' required />
                </div>
                {invitations.length>0?(
                    <div className='w-full overflow max-h-screen pt-4 pb-10'>
                        {searchedInvitations.map((invitaion, i) => (
                            <InvitationCard key={i} {...invitaion} />
                        ))}
                    </div>
                ):(
                    <div className='w-full overflow max-h-screen pt-4 pb-10 flex h-1/4 justify-center items-center text-2xl flex-col'>
                        <div className='mt-60 mb-5'><img src='../../../../images/no-results.png' className='w-20'/></div>
                        <div>No Invitaions Found!</div>
                    </div>
                )}
            </div>
        ):(
            <div className='w-full relative'>
                <div className='p-5 text-4xl font-bold ml-6'>Invitations</div>
                <div className='relative ml-10'>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" value="" disabled className="block w-80 p-4 pl-10 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-1 focus:primary-1 hover:cursor-not-allowed" placeholder="Search Your Invitations..." autoComplete='off' required />
                </div>
                <div className='w-full overflow max-h-screen pt-4 pb-10'>
                    <LoadingInvitationCard />
                    <LoadingInvitationCard />
                    <LoadingInvitationCard />
                    <LoadingInvitationCard />
                    <LoadingInvitationCard />
                </div>
            </div>
        )}
    </div>
  )
}
