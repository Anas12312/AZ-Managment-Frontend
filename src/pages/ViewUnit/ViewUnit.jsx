import React, { createContext, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { useNavigate, useParams } from 'react-router-dom'
import config from '../../../config';
import UnitSideBar from './UnitSideBar/SideBar';
import Item from '../../Item';
import { FaEllipsisV, FaPlus } from 'react-icons/fa';
import NewNodeModal from '../../modals/NewNodeModal';
import LoadingItem from '../../components/LoadingItem'
import DropDownButton from '../../components/DropDownButton';
import DeleteModal from '../../modals/DeleteModal';
import UnitModal from '../../modals/UnitModal';

const LoadNodesContext = createContext(null);

export { LoadNodesContext };

export default function ViewUnit(props) {
  const params = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const [isOwner, setIsOwner] = useState(false)


  //Delete Unit Modal
  const [unitDeleteModal, setUnitDeleteModal] = useState(false)
  const [unitEditModal, setUnitEditModal] = useState(false)

  const nav = useNavigate()

  const update = () => {
    loadNodes(params.id) 
  }
  const loadNodes = (id, search) => {
    setIsLoading(true);
    fetch(config.BASE_URL + `/units/${id}?${search && 'search=' + search}`, {
      method: "GET",
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }).then((res) => res.json())
      .then((response) => {
        setIsLoading(false)
        setData(response)
        if (response.owner.username === JSON.parse(localStorage.getItem('user')).username) {
          setIsOwner(true)
        }
      }).catch((err) => {
        setSearchValue("")
        setData(null)
        nav(-1)
      });
  }

  useEffect(() => {
    loadNodes(params.id)
  }, [])

  const rerenderNote = () => {
    loadNodes(params.id)
  }

  const [isOpenNewNode, setIsOpenNewNode] = useState(false);
  const openNewNodeModal = () => {
    setIsOpenNewNode(true)
  }

  return (
    <div className='flex flex-row h-[99%] top-14'>
      <UnitSideBar selected={'resources'} unitId={params.id} />
      <NewNodeModal
        isOpen={isOpenNewNode}
        setIsOpen={setIsOpenNewNode}
        loadNodes={loadNodes}
      />

      {!isLoading ? (
        <div className='w-full'>
          <DeleteModal
            isOpen={unitDeleteModal}
            setIsOpen={setUnitDeleteModal}
            deleteType={'UNIT'}
            _id={data._id}
          />
          <UnitModal
            isEdit={true}
            _id={data._id}
            name={data.name}
            description={data.description}
            coverUrl={data.coverUrl}
            isOpen={unitEditModal}
            setIsOpen={setUnitEditModal}
          />

          <div className='h-24 w-[98.3%] p-5 flex items-center justify-between mt-4'>
            <div className='p-2 flex flex-col justify-center'>
              <div className='text-2xl font-bold'>{data.name}</div>
              <div className='text-base font-light'>{data.description}</div>
              <div className='text-base font-light'>Owner: <span onClick={() => { nav('/profile/' + data.owner.username) }} className='text-blue-600 hover:underline hover:cursor-pointer'>{data.owner.name}</span></div>
            </div>
            {isOwner && (
              <div className='p-2 flex flex-col justify-center rounded-full hover:bg-gray-300 hover:cursor-pointer'>
                <DropDownButton
                  options={[{ innerText: 'Edit', action: () => { setUnitEditModal(true) } }, { innerText: 'Delete', action: () => { setUnitDeleteModal(true) } }]}
                >
                  <div className='text-primary-1' title='More Actions'><FaEllipsisV size={20} /></div>
                </DropDownButton>
              </div>
            )}
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
                  <input type="search" id="default-search" value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-1 focus:primary-1 " placeholder="Search Nodes or Resources" />
                  <button type="submit" className="text-white absolute right-2.5 bottom-2 bg-primary-1
                                                     hover:bg-primary-2
                                                      font-medium rounded-lg
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
          <div className='w-[97%] overflow-hidden pl-5 h-[63%]'>
            <div className='overflow-auto h-full'>
              <LoadNodesContext.Provider value={rerenderNote}>
                {data.nodes.map((node, i) => (
                  <Item key={i} {...node} />
                ))}
              </LoadNodesContext.Provider>
            </div>
          </div>
        </div>
      ) : (
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
                  <input type="search" id="default-search" value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-1 focus:primary-1 " placeholder="Search Nodes or Resources" required />
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
