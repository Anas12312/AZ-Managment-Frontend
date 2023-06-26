import React from 'react'

export default function LoadingCard() {
  return (
    <div> <div className='loading-card'>
    <div className=' w-full  h-1/2 rounded-t-lg border bg-black bg-opacity-5'>

    </div>
    <div className='relative left-3 h-1/3 flex flex-col align-middle top-2'>
        <div className='w-5/12 mt-2 h-6 rounded-md border bg-gray-700 bg-opacity-5 border-gray-200'>
            
        </div>
        <div className='w-10/12 mt-4 h-5 rounded-md border bg-gray-700 bg-opacity-5 border-gray-200'>
            <span className='card-text'>
                
            </span>
        </div>
        <div className='w-1/3 mt-1 h-5 rounded-md border bg-gray-700 bg-opacity-5  border-gray-200'>
            <span className='card-text'>
                
            </span>
        </div>
    </div>
</div></div>
  )
}
