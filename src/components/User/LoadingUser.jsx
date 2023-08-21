import React from 'react'
import LoadingItem from '../LoadingItem'
import { FaEllipsisV, FaPlus } from 'react-icons/fa'

export default function LoadingUser() {
  return (
    <div className='w-full'>
      <div className='h-24 w-[98.3%] p-5 flex items-center justify-between'>
        <div className='p-2 flex flex-col justify-center'>
          <div className='m-1 bg-gradient-to-r from-gray-50 to-primary-gray to-80% background-animate-1 h-5 w-40 bg-red-400'></div>
          <div className='m-1 bg-gradient-to-r from-gray-50 to-primary-gray to-80% background-animate-1 h-5 w-80 bg-red-400'></div>
          <div className='m-1 bg-gradient-to-r from-gray-50 to-primary-gray to-80% background-animate-1 h-5 w-24 bg-red-400'></div>
        </div>
        <div className='p-2 flex flex-col justify-center rounded-full hover:bg-gray-300 hover:cursor-pointer'>
          <div className='text-primary-1' title='More Actions'><FaEllipsisV size={20} /></div>
        </div>
      </div>
      <div className="w-full h-24 flex items-center justify-between">
        <div className="relative left-5 w-1/3">
          <form>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" disabled id="default-search" value={""} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-1 focus:primary-1 " placeholder="Search Nodes or Resources" required />
              <button disabled type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-primary-1
                                                hover:bg-primary-2 focus:ring-4 focus:outline-none
                                                focus:ring-primary-1 font-medium rounded-lg
                                                text-sm px-4 py-2"
               >Search</button>
            </div>
          </form>

        </div>
        <div className="w-20 flex">
          <div  className='w-10 h-10 hover:bg-primary-2 flex
                              justify-center items-center rounded-md border-2 text-white bg-primary-1 
                              hover:cursor-not-allowed transition-all transtion duration-400 ease-linear'>
            <FaPlus /></div>
        </div>
      </div>
      <div className='w-[97%] overflow max-h-screen pl-5 flex-col h-[75%]'>
        <div className='overflow-auto h-full'>
          <LoadingItem />
          <LoadingItem />
          <LoadingItem />
          <LoadingItem />
        </div>
      </div>
    </div>
  )
}
