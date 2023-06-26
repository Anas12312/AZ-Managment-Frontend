import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import Card from '../../components/Card'
import config from '../../../config';
import Pagination from '../../components/Pagination';

export default function Resources() {
  
  const [units, setUnits] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);


  const getAllUserUnits = async (page) => {
    const res = fetch(config.BASE_URL + `/units?page=${page}&limit=6`, {
      method: "GET",
      headers:  
      { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }).then((res) => res.json())
    .then((response)=>{
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
    <div className='flex h-screen w-screen flex-col overflow-hidden'>
        <NavBar selected={"files"}/>
        <div className='flex flex-row h-screen'>  
            <SideBar />
            <div className='w-full'>
              <div className='w-full overflow max-h-screen pt-4 pb-10 grid grid-cols-3 grid-rows-2'>
                {units.map((unit, i) => (
                  <Card key={i} {...unit}/>
                ))}
              </div>
              <div className=''>
                <Pagination page={page} count={count} setPage={setPage} />
              </div>
            </div>
        </div>
    </div>
  )
}
