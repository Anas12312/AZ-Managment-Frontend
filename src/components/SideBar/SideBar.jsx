
import React, { useEffect, useState } from 'react'
import SideBarItem from './SideBarItem/SideBarItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaCube, FaStar, FaUser, FaFile, FaClock, FaPlus } from 'react-icons/fa'
import Modal from 'react-modal';
import config from '../../../config'
import { useNavigate } from 'react-router-dom';


export default function SideBar({selected}) {
  
  const nav = useNavigate();

  const rootEl = document.getElementById('root');
  

  //Modal Show State
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  }
  const closeModal = () => {
    setError(' ')
    setModalIsOpen(false);
  }

  //New Unit Modal State
  const [unitName, setUnitName] = useState('')
  const [unitDescription, setUnitDescription] = useState('')
  const [error, setError] = useState(' ')

  const createNewUnit = () => {
      if(!unitName) {
        setError('Please provide name for the unit')
        const classList = document.getElementById('Unit-Name').classList;
        classList.replace('border-primary-1', 'border-red-700')
        classList.replace('border', 'border-2')

        const nameLabel = document.getElementById('Unit-Name-Lable').classList;
        nameLabel.add('text-red-700', 'font-bold')

        return
      }

      fetch(config.BASE_URL + '/units' , {
        method: 'POST',
        headers:  { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(
          {
            name: unitName,
            description:unitDescription
          }
        )
      }).then(res => {

        return res.json()
      })
      .then(result => {
        if(result.error) {
          setError(result.error)
          return
        }
        nav(`/unit/${result._id}`)
      }).catch(error => {
        console.log(error);
      })
  }


  return (

    <div className='flex flex-col h-full max-h-screen flex-grow w-72 pt-3 bg-gray-400 bg-opacity-10'>
      <Modal
        appElement={rootEl}
        isOpen={modalIsOpen}
        className={'h-1/3 w-1/3 left-1/3 top-1/3 absolute flex flex-col justify-center items-center border p-5 rounded-md bg-secondary-2 text-black'}
        onRequestClose={closeModal}
        shouldFocusAfterRender={false}
      >
        <div><span className='text-sm ml-1 text-red-600 font-bold'>{error}</span></div>
        <div className='w-full'>
            <div><label htmlFor="Unit-Name" id='Unit-Name-Lable' className='text-sm ml-1'>Name</label></div>
            <input  id='Unit-Name' className='text-sm w-full my-1 h-8 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 'type='text'
            onChange={(e) => {
              setUnitName(e.target.value)
            }}
            />
        </div>

        <div className='w-full'>
            <div><label htmlFor="Unit-Description" className='text-sm ml-1'>Description</label></div>
            <textarea  id='Unit-Description'  className='resize-none text-sm w-full max-h-md my-1 h-16 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 'type='text'
            onChange={(e) => {
              setUnitDescription(e.target.value)
            }} />
        </div>

        <div className='w-full'>
            <button className="w-full  h-9 rounded-md border text-sm bg-primary-2 text-white hover:bg-primary-1"
              onClick={createNewUnit}
            >Create</button>
        </div>

      </Modal>
      <div className='new-button' onClick={openModal}>
        <FaPlus /> New
      </div>
      <div className='relative flex flex-col left-3 top-7'>
        {selected === 'my-units'?(<SideBarItem id={"my-units"} text={"My Units"} icon={<FaFile />} link={"/resources"} selected={true} />):(<SideBarItem id={"my-units"} text={"My Units"} icon={<FaFile />} link={"/resources"} />)}
        {selected === 'starred'?(<SideBarItem id={"starred"} text={"Starred"} icon={<FaStar />} link={"/resources/starred"} selected={true} />):(<SideBarItem id={"starred"} text={"Starred"} icon={<FaStar />} link={"/resources/starred"} />)}
        {selected === 'shared'?(<SideBarItem id={"shared"} text={"Shared With Me"} icon={<FaUser />} link={""} selected={true} />):(<SideBarItem id={"shared"} text={"Shared With Me"} icon={<FaUser />} link={""} />)}
        {selected === 'recent'?(<SideBarItem id={"recent"} text={"Recents"} icon={<FaClock />} link={""} selected={true} />):(<SideBarItem id={"recent"} text={"Recents"} icon={<FaClock />} link={""} />)}
      </div>
    </div>
  )
}
