import React, { useEffect, useState } from 'react'
import { FaClock } from 'react-icons/fa';
import Unit from './Unit';
import Note from './Note';
import User from './User';
import config from '../../../../config';

export default function RecentlyViewed() {
    const [units, setUnits] = useState([])
    const [users, setUsers] = useState([])
    const [notes, setNotes] = useState([])
    
    // useEffect(() => {
    //     fetch(config.BASE_URL + `/recent`, {
    //         method: "GET",
    //         headers:
    //         {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem('token')
    //         }
    //         }).then((res) => res.json())
    //     .then((response) => {
    //         setUnits(response.units)
    //         setNotes(response.notes)
    //         setUsers(response.users)
    //     })
    // })

  return (
    <div className='w-full h-full flex flex-col text-gray-600'>
        <div className='flex items-center mt-8 mb-6 font-bold'>
            <FaClock /> <span className='ml-1'>Recently viewed</span>
        </div>
        <div className='text-sm font-bold'>
            Units
        </div>
        <div className='border-b pt-2 pb-4'>
            {units.map((unit, index) => {
                return <Unit key={index} name={unit} />
            })}
        </div>
        <div className='text-sm font-bold mt-3'>
            Notes
        </div>
        <div className='border-b pt-2 pb-4'>
            {units.map((unit, index) => {
                return <Note key={index} name={unit} />
            })}
        </div>
        <div className='text-sm font-bold mt-3'>
            Users
        </div>
        <div className='pt-2 pb-4'>
            {units.map((unit, index) => {
                return <User key={index} name={unit} />
            })}
        </div>
    </div>
  )
}
