import React from 'react'
import { FaCheck } from 'react-icons/fa'

export default function LoadingInvitationCard() {
  return (
    <div className='ml-10 w-[95%] border-2 rounded-md p-2 flex items-center m-1 relative bg-gradient-to-r from-gray-200 to-primary-gray to-80% background-animate-1'>
        <div className='w-16 h-16 flex justify-center items-center
                    bg-gradient-to-r from-gray-50 to-primary-gray to-40% background-animate-1 border-gray-600 text-xl rounded-full m-2 mr-4
                    text-white flex-shrink-0 flex-grow-0 group'>
        </div>
        <div className='flex flex-col justify-center w-[25%] h-8 bg-gradient-to-r from-gray-300 to-primary-gray to-80% background-animate-1 border-gray-600'></div>
        <div className='flex flex-col justify-center w-[18%] h-full bg-black'></div>
        <div className='flex flex-col justify-center w-[14%] h-full bg-black'></div>
        <div className='flex flex-col justify-center w-[20%] h-full bg-black'></div>
        <div className='flex items-center justify-end w-[20%] h-full pr-2'>
            <div className='w-12 h-12 bg-green-700 text-white text-lg flex justify-center
                            items-center bg-opacity-50 hover:cursor-not-allowed
                            trans rounded-md'
                 ><FaCheck /></div>
            <div className='w-12 h-12 bg-red-700 text-white text-lg font-bold flex justify-center 
                            items-center bg-opacity-50 hover:cursor-not-allowed
                            trans rounded-md'>X</div>
        </div>
    </div>
  )
}
