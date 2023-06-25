import React, { useEffect } from 'react'

export default function Card({id, coverUrl, name, username}) {
    
    return (
    <div className='card'>
        <div 
        id={id} 
        className=' w-full  h-2/3 rounded-t-lg' 
        style={ coverUrl ? {backgroundImage:`url(${coverUrl})`, backgroundSize:'100% auto'} : {background:'#513069'}}
        >
        </div>
        <div className='h-1/3 flex flex-col align-middle'>
            <div className='w-11/12 mt-2'>
                <span className='text-black font-bold text-lg ml-3'>
                    {name}
                </span>
            </div>
            <div className='w-11/12'>
                <span className='text-black text-sm ml-3'>
                    {username}
                </span>
            </div>
        </div>
    </div>
  )
}
