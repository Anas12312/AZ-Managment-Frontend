import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

export default function UnitSearchCard({_id:id, name, coverUrl, description, selected, selectUnit} ) {
    
  return (
    <div className='border m-1 h-20 flex rounded-md'>
        <div className='w-20 h-full flex justify-center items-center
                    bg-primary-1 text-xl rounded-sm
                    text-white flex-shrink-0 flex-grow-0 group'>
            {coverUrl?(
                <img id={"img"} className="object-cover w-full h-full" src={coverUrl} onError={() => { document.getElementById(`img`).src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} />
            ):(
                <div className='bg-primary-1 w-full h-full'></div>
            )}
        </div>
        <div className='w-[80%] h-full flex flex-col p-2 overflow-hidden'>
            <div className='font-bold'>{name}</div>
            <div className='text-xs font-light'>{description}</div>
        </div>
        {selected?(
            <div className='w-5 h-5 border-2 border-green-700 bg-green-200 m-1 text-green-800 rounded-sm flex justify-center items-center p-1 hover:cursor-pointer hover:bg-green-600'><FaCheck /></div>
        ):(
            <div onClick={()=>{
                selectUnit(id)
            }} className='w-5 h-5 border-2 bg-gray-400 m-1 text-white rounded-sm flex justify-center items-center p-1 hover:cursor-pointer hover:bg-gray-600'><FaCheck /></div>
        )}
    </div>
  )
}
