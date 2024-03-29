import React, { useEffect, useState } from 'react'
import SideBar from '../../../components/SideBar/SideBar'
import Pagination from '../../../components/Pagination'
import Card from '../../../components/Card'
import LoadingCard from '../../../components/LoadingCard'
import config from '../../../../config'

export default function StarredUnits() {
  const [units, setUnits] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getAllUserUnits = async (page) => {
    setIsLoading(true);
    fetch(config.BASE_URL + `/units/starred?page=${page}&limit=6`, {
      method: "GET",
      headers:  
      { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }).then((res) => res.json())
    .then((response)=>{
      setIsLoading(false)
      response.units.forEach((unit) => {
        unit.starred = true
      })
      setUnits(response.units);
      setCount(response.count);
    }).catch((err)=>{
      alert(err);
    });
  }
  useEffect(() => {
    getAllUserUnits(page);
  }, [])
  useEffect(() => {
    getAllUserUnits(page);
  }, [page])

  return (
    <div>  
            {!isLoading?(
              <div className='flex flex-col h-full'>
                {units.length>0?(
                  <div className='w-full overflow max-h-screen pt-4 pb-10 grid grid-cols-3 grid-rows-2'>
                    {units.map((unit, i) => (
                      <Card key={i} {...unit} ownerName={unit.owner.name}/>
                    ))}
                  </div>
                ):(
                  <div className='w-full overflow h-[37rem] pt-4 pb-10 flex justify-center items-center text-2xl flex-col'>
                    <div className=' mb-5'><img src='../../../../images/no-results.png' className='w-20'/></div>
                    <div>No Starred Units Found!</div>
                  </div>
                )}
              <div className=''>
                <Pagination page={page} count={count} setPage={setPage} />
              </div>
            </div>
            ):(
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
