import React, { useEffect, useState } from 'react'
import UnitSideBar from '../UnitSideBar/SideBar'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import config from '../../../../config';
import User from './User/User';
import LoadingUser from './User/LoadingUser';
import { FaPlus } from 'react-icons/fa';
import InviteFromUnitModal from '../../../modals/InviteFromUnitModal'

export default function ViewMembers() {
    const params = useParams()

    const [isLoading, setIsLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const [unit, setUnit] = useState(null)
    const [users, setUsers] = useState([])

    const [searchValue, setSearchValue] = useState('')

    const nav = useNavigate();

    const GetUnit = (id) => {
        setIsLoading(true);
        fetch(config.BASE_URL + `/units/users/${id}?search=${searchValue}`, {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then((res) => res.json())
            .then((response) => {
                setIsLoading(false)
                setUsers(response.users)
                setUnit(response.unit)

                if (response.unit.owner.username === JSON.parse(localStorage.getItem('user')).username) {
                    setIsOwner(true)
                }

            }).catch((err) => {
                console.log(err);
                setUnit(null)
                setUsers([])
                nav(-1)
            });
    }

    useEffect(() => {
        GetUnit(params.id)
    }, [])
    return (
        <div className='flex flex-row h-[99%] top-14'>
            <InviteFromUnitModal isOpen={isInviteModalOpen} setIsOpen={setIsInviteModalOpen} />
            <UnitSideBar selected={'members'} unitId={params.id} />
            {!isLoading ? (
                <div className='w-full'>
                    <div className='h-24 w-[98.3%] p-5 flex items-center justify-between mt-4'>
                        <div className='p-2 flex flex-col justify-center'>
                            <div className='text-2xl font-bold'>{unit.name}</div>
                            <div className='text-base font-light'>{unit.description}</div>
                            <div className='text-base font-light'>Owner: <span onClick={() => { nav('/profile/' + unit.owner.username) }} className='text-blue-600 hover:underline hover:cursor-pointer'>{isOwner ? 'Me' : unit.owner.name}</span></div>
                        </div>
                    </div>

                    <div className='text-2xl ml-8'>Members</div>

                    <div className="w-full h-20 flex items-center justify-between">
                        <div className="relative left-8 w-1/3">
                            <form>
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-1 focus:primary-1 " placeholder="Search Members" />
                                    <button type="submit" className="text-white absolute right-2.5 bottom-2 bg-primary-1
                                                     hover:bg-primary-2
                                                      font-medium rounded-lg
                                                      text-sm px-4 py-2"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            GetUnit(params.id)
                                        }}>Search</button>
                                </div>
                            </form>

                        </div>
                        <div className="w-20 flex">
                            <div className='w-10 h-10 hover:bg-primary-2 flex
                                  justify-center items-center rounded-md border-2 text-white bg-primary-1 
                                  hover:cursor-pointer transition-all transtion duration-400 ease-linear'
                                 onClick={()=>{setIsInviteModalOpen(true)}}
                                 title={"Invite Users"}
                            >
                                <FaPlus /></div>
                        </div>
                    </div>

                    <div className='w-full pb-5 flex flex-col justify-center items-center overflow-auto'>
                        {users.map((user, index) => <User key={index} unitId={params.id} isOnwer={isOwner} {...user} />)}
                    </div>

                </div>
            ) : (
                <LoadingUser />
            )}
        </div>
    )
}
