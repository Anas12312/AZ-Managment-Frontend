import React, { useEffect, useState } from 'react'
import UnitSideBar from '../UnitSideBar/SideBar'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import config from '../../../../config';


export default function ViewMembers() {
    const params = useParams()

    const [isLoading, setIsLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const [unit, setUnit] = useState();

    const nav = useNavigate();

    const GetUnit = (id) => {
        setIsLoading(true);
        fetch(config.BASE_URL + `/units/${id}`, {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then((res) => res.json())
            .then((response) => {
                setIsLoading(false)
                setUnit(response)
                if (response.owner.username === JSON.parse(localStorage.getItem('user')).username) {
                    setIsOwner(true)
                }
            }).catch((err) => {
                console.log(err);
                setUnit(null)
                // nav(-1)
            });
    }

    useEffect(() => {
        // GetUnit(params.Id)
    }, [])

    return (
        <div className='flex flex-row h-[99%] top-14'>
            <UnitSideBar selected={'members'} unitId={params.id} />
            <div className='w-full'>
                <div className='h-24 w-[98.3%] p-5 flex items-center justify-between mt-4'>
                    <div className='p-2 flex flex-col justify-center'>
                        <div className='text-2xl font-bold'>zzzz</div>
                        <div className='text-base font-light'>zzzzzzzz</div>
                        <div className='text-base font-light'>Owner: <span onClick={() => { nav('/profile/' + 'zzya') }} className='text-blue-600 hover:underline hover:cursor-pointer'>zyad</span></div>
                    </div>
                </div>

                <div className='text-2xl ml-4 mt-6'>Members</div>
                
                <div className='w-full  py-5 flex flex-col justify-center items-center'>
                    <div className='w-[98%] h-16 pl-4 flex justify-start gap-64 my-2 items-center border-2 rounded-md'>
                        <dvi className='flex gap-10'>
                            <div>
                                Avatar
                            </div>
                            <div>
                                Name(username)
                            </div>
                        </dvi>
                        <div>
                            Email
                        </div>
                        <div>
                            Status
                        </div>
                    </div>
                    <div className='w-[98%] h-16 pl-4 flex justify-start gap-64 my-2 items-center border-2 rounded-md'>
                        <dvi className='flex gap-10'>
                            <div>
                                Avatar
                            </div>
                            <div>
                                Username
                            </div>
                        </dvi>
                        <div>
                            Email
                        </div>
                        <div>
                            Status
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
