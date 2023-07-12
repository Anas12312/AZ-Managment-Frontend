import React, { useEffect, useState } from 'react'
import UnitSideBar from '../UnitSideBar/SideBar'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import config from '../../../../config';
import User from './User/User';
import LoadingUser from './User/LoadingUser';

export default function ViewMembers() {
    const params = useParams()

    const [isLoading, setIsLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const [unit, setUnit] = useState();

    const nav = useNavigate();

    const GetUnit = (id) => {
        setIsLoading(true);
        fetch(config.BASE_URL + `/units/users/${id}`, {
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
        GetUnit(params.id)
    }, [])
    return (
        <div className='flex flex-row h-[99%] top-14'>
            <UnitSideBar selected={'members'} unitId={params.id} />
            {!isLoading?(
                <div className='w-full'>
                    <div className='h-24 w-[98.3%] p-5 flex items-center justify-between mt-4'>
                        <div className='p-2 flex flex-col justify-center'>
                            <div className='text-2xl font-bold'>{unit.name}</div>
                            <div className='text-base font-light'>{unit.description}</div>
                            <div className='text-base font-light'>Owner: <span onClick={() => { nav('/profile/' + unit.owner.username) }} className='text-blue-600 hover:underline hover:cursor-pointer'>{isOwner?'Me':unit.owner.name}</span></div>
                        </div>
                    </div>

                    <div className='text-2xl ml-8 mt-6'>Members</div>
                    
                    <div className='w-full py-5 flex flex-col justify-center items-center overflow-auto'>
                        {unit.users.map((user, index)=><User key={index} {...user} />)}
                    </div>
                </div>
            ):(
                <LoadingUser />
            )}
        </div>
    )
}
