import React, { createContext, useEffect, useState } from 'react'
import SideBar from '../../../components/SideBar/SideBar'
import Pagination from '../../../components/Pagination'
import Card from '../../../components/Card'
import LoadingCard from '../../../components/LoadingCard'
import config from '../../../../config'

export default function MyUnits() {
  const [units, setUnits] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);



  const { username } = JSON.parse(localStorage.getItem("user"));


  const getAllUserUnits = async (page) => {
    setIsLoading(true);
    fetch(config.BASE_URL + `/units?page=${page}&limit=6`, {
      method: "GET",
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }).then((res) => res.json())
      .then((response) => {
        setIsLoading(false)
        const starredUnits = response.starred
        response.units.forEach((unit) => {
          if (starredUnits.includes(unit._id)) {
            unit.starred = true
          } else {
            unit.starred = false
          }
        })
        setUnits(response.units);
        setCount(response.count);
      })
  }
  useEffect(() => {
    getAllUserUnits(page);
  }, [])
  useEffect(() => {
    getAllUserUnits(page);
  }, [page])

  return (
    <div>
      {!isLoading ? (
        <div className='flex flex-col h-full'>
          {units.length>0?(
            <div className='w-full overflow pt-4 pb-10 grid grid-cols-3 grid-rows-2'>
              {units.map((unit, i) => (
                <Card key={i} {...unit} ownerName={unit.owner.name} isOwner={(username === unit.owner.username)} />
              ))}
            </div>
          ):(
            <div className='w-full overflow h-[37rem] pt-4 pb-10 flex justify-center items-center text-2xl flex-col'>
              <div className=' mb-5'><img src='../../../../images/no-results.png' className='w-20'/></div>
              <div>No Units Found!</div>
            </div>
          )}
          <Pagination page={page} count={count} setPage={setPage} />
        </div>
      ) : (
        <div className='w-full'>
          <div className='w-full overflow pt-4 pb-10 grid grid-cols-3 grid-rows-2'>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        </div>
      )}
    </div>
  )
}
