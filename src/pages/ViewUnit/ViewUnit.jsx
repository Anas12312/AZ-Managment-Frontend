import React, { createContext, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { useNavigate, useParams } from 'react-router-dom'
import config from '../../../config';
import SideBar from '../../components/SideBar/SideBar';
import Item from '../../Item';
import { FaPlus } from 'react-icons/fa';
import NewNodeModal from '../../modals/NewNodeModal';
import LoadingItem from '../../components/LoadingItem'

const LoadNodesContext = createContext(null);

export {LoadNodesContext};

export default function ViewUnit(props) {
    const params = useParams();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const nav = useNavigate()
    const update = () => {
      loadNodes(params.id)
    }
    const loadNodes = (id, search) => {
      setIsLoading(true);
      fetch(config.BASE_URL + `/units/${id}?${search&&'search='+search}`, {
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
        alert(err);
        setSearchValue("")
        setData(null)
        nav(-1)
      }); 
    }
    
    useEffect(() => {
        loadNodes(params.id)
    },[])

    const rerenderNote = () => {
      loadNodes(params.id)
    }

    const [isOpenNewNode, setIsOpenNewNode] = useState(false);
    const openNewNodeModal = () => {
      setIsOpenNewNode(true)
    }

  return (
    <div className='flex flex-row h-screen'>
        <SideBar />
        <NewNodeModal isOpen={isOpenNewNode} setIsOpen={setIsOpenNewNode} loadNodes={loadNodes}/>
        
        
        {!isLoading?(
              <div className='w-full'>
                <div className="w-full h-24 flex items-center justify-between">
               <div className="relative left-5 w-1/3">
              <form>   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-1 focus:primary-1 " placeholder="Search Nodes or Resources" required />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-primary-1
                                                     hover:bg-primary-2 focus:ring-4 focus:outline-none
                                                     focus:ring-primary-1 font-medium rounded-lg
                                                      text-sm px-4 py-2"
                                onClick={(e) => {
                                  e.preventDefault()
                                  console.log(searchValue)
                                  loadNodes(params.id, searchValue)
                                }}>Search</button>
                    </div>
                </form>

               </div>
                  <div className="w-20 flex">
                    <div className='w-10 h-10 hover:bg-primary-2 flex
                                  justify-center items-center rounded-md border-2 text-white bg-primary-1 
                                  hover:cursor-pointer transition-all transtion duration-400 ease-linear' 
                        onClick={openNewNodeModal}>
                    <FaPlus /></div>
                  </div>
                </div>
                <div className='w-[97%] overflow max-h-screen pl-5 flex-col h-[75%]'>
                    <div className='overflow-auto h-full'>
                        <LoadNodesContext.Provider value={rerenderNote}>
                          {data.nodes.map((node, i) => (
                              <Item key={i} {...node}/>
                          ))}
                        </LoadNodesContext.Provider>
                    </div>
                </div>
            </div>
            ):(
              <div className='w-full'>
                <div className="w-full h-24 flex items-center justify-between">
               <div className="relative left-5 w-1/3">
              <form>   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-1 focus:primary-1 " placeholder="Search Nodes or Resources" required />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-primary-1
                                                     hover:bg-primary-2 focus:ring-4 focus:outline-none
                                                     focus:ring-primary-1 font-medium rounded-lg
                                                      text-sm px-4 py-2"
                                onClick={(e) => {
                                  e.preventDefault()
                                  console.log(searchValue)
                                  loadNodes(params.id, searchValue)
                                }}>Search</button>
                    </div>
                </form>

               </div>
                  <div className="w-20 flex">
                    <div className='w-10 h-10 hover:bg-primary-2 flex
                                  justify-center items-center rounded-md border-2 text-white bg-primary-1 
                                  hover:cursor-pointer transition-all transtion duration-400 ease-linear' 
                        onClick={openNewNodeModal}>
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
            )}
    </div>
  )
}
