import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { useNavigate, useParams } from 'react-router-dom'
import config from '../../../config';
import SideBar from '../../components/SideBar/SideBar';
import Item from '../../Item';

export default function ViewUnit(props) {
    const params = useParams();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const nav = useNavigate()
    useEffect(() => {
        fetch(config.BASE_URL + `/units/${params.id}`, {
            method: "GET",
            headers:  
            { 
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem('token')
            }
          }).then((res) => res.json())
          .then((response)=>{
            setIsLoading(false)
            setData(response)
          }).catch((err)=>{
            alert("This Node can't be found. it might have been removed by the author!");
            setData(null)
            nav(-1)
          }); 
    },[])
  return (
    <div className='flex flex-row h-screen'>
        <SideBar />
        {!isLoading?(
              <div className='w-full'>
                <div className='h-16'></div>
                <div className='w-[97%] overflow max-h-screen pl-5 flex-col h-[75%]'>
                    <div className='overflow-auto h-full'>
                        {data.nodes.map((node, i) => (
                            <Item key={i} {...node}/>
                        ))}
                    </div>
                </div>
            </div>
            ):(
              <div className='w-full'>
                <div className='w-full overflow max-h-screen pt-4 pb-10 grid grid-cols-3 grid-rows-2'>
                    
                </div>
              </div>
            )}
    </div>
  )
}
