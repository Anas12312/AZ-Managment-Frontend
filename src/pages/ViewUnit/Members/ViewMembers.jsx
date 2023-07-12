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
        GetUnit(params.Id)
    }, [])

    return (
        <div className='flex flex-row h-[99%] top-14'>
            <UnitSideBar selected={'members'} unitId={params.id} />
            <div className='w-full'>
                Members
            </div>
        </div>
    )
}
