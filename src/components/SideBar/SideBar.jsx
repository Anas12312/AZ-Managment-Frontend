import React, { useState } from 'react'
import SideBarItem from './SideBarItem/SideBarItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaCube, FaStar, FaUser, FaFile, FaClock, FaPlus } from 'react-icons/fa'
import Modal from 'react-modal';
import config from '../../../config'
import { useNavigate } from 'react-router-dom';


export default function SideBar() {
  
  const nav = useNavigate();

  const rootEl = document.getElementById('root');
  
  //Modal Show State
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  }
  const closeModal = () => {
    setModalIsOpen(false);
  }

  //New Unit Modal State
  const [unitName, setUnitName] = useState('')
  const [unitDescription, setUnitDescription] = useState('')
  
  const createNewUnit = () => {
      fetch(config.BASE_URL + '/units' , {
        method: 'POST',
        headers:  { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(
          {
            name: unitName,
            description:unitDescription,
            coverUrl: "https://rare-gallery.com/mocahbig/393701-sentinel-olaf-splash-art-lol-skin-league-of-legends.jpg"
          }
        )
      }).then(res => res.json())
      .then(result => {
        nav('/')
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
        <div className='w-full'>
            <div><label htmlFor="Name" className='text-sm ml-1'>Name</label></div>
            <input  id='Name' className='text-sm w-full my-1 h-8 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 'type='text' name='Name' 
            onChange={(e) => {
              setUnitName(e.target.value)
            }}
            />
        </div>

        <div className='w-full'>
            <div><label htmlFor="Description" className='text-sm ml-1'>Description</label></div>
            <textarea  id='Description'  className='resize-none text-sm w-full max-h-md my-1 h-16 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 'type='text' name='Description'
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
        <SideBarItem selected={true} text={"My Units"} icon={<FaFile />} link={"/resources"} />
        <SideBarItem text={"Shared With Me"} icon={<FaUser />} link={""} />
        <SideBarItem text={"Starred"} icon={<FaStar />} link={""} />
        <SideBarItem text={"Recents"} icon={<FaClock />} link={""} />
      </div>
    </div>
  )
}
