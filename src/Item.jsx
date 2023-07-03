import React, { useState } from 'react'
import { FaArrowDown, FaArrowUp, FaLink, FaImage, FaFile, FaPencilAlt, FaTrash, FaEye, FaPlus, FaFileAlt } from 'react-icons/fa'
import Modal from 'react-modal';
import config from '../config';
export default function Item(props) {
  const [ItemData, setItemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expand, setExpand] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modal2IsOpen, setModal2IsOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState('');
  const [deleteStatus, setDeleteStatus] = useState(200);
  const openModal = () => {
    setModalIsOpen(true);
  }
  const closeModal = () => {
    setModalIsOpen(false);
  }
  const openModal2 = () => {
    setModal2IsOpen(true);
  }
  const closeModal2 = () => {
    setModal2IsOpen(false);
    getItemData()
  }
  const deleteResource = async (deletingId) => {
    fetch(config.BASE_URL + `/resource/${deletingId}`, {
      method: "DELETE",
      headers:  
      { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }).then((res) => {
      setDeleteStatus(res.status)
      return res.json()
    })
    .then((response)=>{
      setDeleteResponse(response)
      closeModal();
      openModal2();
    }).catch((err)=>{
      setDeleteResponse(err)
      closeModal();
      openModal2();
    }); 
  }
  let circleCommonClasses = 'h-2 w-2 bg-primary-1   rounded-full';
  const rootEl = document.getElementById('root');
  const getItemData = async() => {
    fetch(config.BASE_URL + `/nodes/${props._id}`, {
      method: "GET",
      headers:  
      { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }).then((res) => res.json())
    .then((response)=>{
      setIsLoading(false)
      setItemData(response.resources)
    }).catch((err)=>{
      alert(err)
      nav(-1)
    }); 
  }
  
  return (
    <div>
      <Modal
        appElement={rootEl}
        isOpen={modalIsOpen}
        className={'h-1/4 w-1/4 left-1/3 top-1/3 absolute flex flex-col justify-between items-center border p-5 rounded-md bg-secondary-2 text-black'}
        shouldFocusAfterRender={false}
      >
        <div className='font-bold mt-5'>
          Are you sure you want to delete this?
        </div>
        <div className='flex justify-between w-[50%] mb-7 items-center'>
          <div className='bg-primary-1 text-white p-2 hover:cursor-pointer hover:bg-primary-2 rounded-md shadow-lg'
              onClick={()=>{deleteResource(deletingId)}}>Delete</div>
          <div className='bg-white text-black p-2 hover:cursor-pointer hover:bg-gray-300 rounded-md'
                onClick={()=>{closeModal()}}>Cancel</div>
        </div>
      </Modal>
      <Modal
        appElement={rootEl}
        isOpen={modal2IsOpen}
        className={'h-1/6 w-1/6 left-[40%] top-1/3 absolute flex flex-col justify-between items-center border rounded-md bg-secondary-2 text-black'}
        shouldFocusAfterRender={false}
        onRequestClose={closeModal2}
      >
        {deleteStatus == 200?(
          <div className='w-full h-full bg-green-200 border border-green-400 flex justify-center items-center bg-opacity-50'>
            Deleted Successfully!
          </div>
        ):(
          deleteResponse?(
            <div className='w-full h-full bg-red-200 border border-red-400 flex justify-center items-center bg-opacity-50'>
              Resource Not Found!
            </div>
          ):(
            <div className='w-full h-full bg-red-200 border border-red-400 flex justify-center items-center bg-opacity-50'>
              An Error Occured Try Again Later
            </div>
          )
        )}
      </Modal>
      <div className='node-container'>
        <div className='item' onClick={() => {
            getItemData();
            setExpand(!expand)
          }}>
          <div className='relative -left-4 font-bold flex items-center w-1/3'> {props.name?<div className='relative left-4'>{props.name}</div>:"-"}</div>
          {expand&&
              (<div className='relative -right-[21rem] rounded-full hover:bg-gray-100 p-1 hover:cursor-pointer' onClick={(e) => {
              
              }}><FaPlus /></div>)}
          <div>{expand?(<FaArrowDown />):(<FaArrowUp />)}</div>
        </div>
        {expand&&
          (!isLoading? (
            <div className='item-detailed'>
              {ItemData.length > 0? (
                ItemData.map((resource, index) => {
                  if(resource.type === "LINK") {
                    return (
                      <div key={index} id={resource._id} className='resource' draggable>
                        <div className='mx-3'><FaLink /></div>
                        <div className='w-[50%] mr-2' >{resource.name}</div>
                        <div className='flex items-center justify-start w-[30%] relative'>
                          {resource.createdBy.imgUrl?(
                            <div className='w-7 h-7 flex justify-center items-center
                                          bg-primary-1 rounded-full text-xl
                                          text-white flex-shrink-0 flex-grow-0'>
                              <img className="object-contain w-full h-full rounded-full" src={resource.createdBy.imgUrl} />
                            </div>
                          ):(
                            <div className='w-full h-full flex justify-center
                                            items-center bg-primary-1 rounded-full
                                            text-xl text-white'>
                              {resource.createdBy.name[0].toUpperCase()}
                            </div>
                          )}
                          <div className='mx-2 text-sm font-bold'>
                            {resource.createdBy.name.split(' ')[0]}
                          </div>
                        </div>
                        <div className='flex relative -right-[4.5rem]'>
                          <div className='resource-option'><FaEye /></div>
                          <div className='resource-option'><FaPencilAlt /></div>
                          <div className='resource-option' onClick={()=>{
                            setDeletingId(resource._id)
                            openModal()
                          }}><FaTrash /></div>
                        </div>
                      </div>
                    )
                  }else if(resource.type === "TEXT") {
                    return (
                      <div key={index} id={resource._id} className='resource' draggable>
                        <div className='mx-3'><FaFileAlt /></div>
                        <div className='w-[50%] mr-2'>{resource.name}</div>
                        <div className='flex items-center justify-start w-[30%] relative'>
                          {resource.createdBy.imgUrl?(
                            <div className='w-7 h-7 flex justify-center items-center
                                          bg-primary-1 rounded-full text-xl
                                          text-white flex-shrink-0 flex-grow-0'>
                              <img className="object-contain w-full h-full rounded-full" src={resource.createdByImageUrl} />
                            </div>
                          ):(
                            <div className='w-full h-full flex justify-center
                                            items-center bg-primary-1 rounded-full
                                            text-xl 
                                            text-white'>
                              {resource.createdBy.name[0].toUpperCase()}
                            </div>
                          )}
                          <div className='mx-2 text-sm font-bold'>
                            {resource.createdBy.name.split(' ')[0]}
                          </div>
                        </div>
                        <div className='flex relative -right-[4.5rem]'>
                          <div className='resource-option'><FaEye /></div>
                          <div className='resource-option'><FaPencilAlt /></div>
                          <div className='resource-option' onClick={()=>{
                            setDeletingId(resource._id)
                            openModal()
                          }}><FaTrash /></div>
                        </div>
                      </div>
                    )
                  }else if(resource.type === "IMAGE") {
                    return (
                      <div key={index} id={resource._id} className='resource' draggable>
                        <div className='mx-3'><FaImage /></div>
                        <div className=' w-[50%] mr-2'>{resource.name}</div>
                        <div className='flex items-center justify-start w-[30%] relative'>
                          {resource.createdBy.imgUrl?(
                            <div className='w-7 h-7 flex justify-center items-center
                                          bg-primary-1 rounded-full text-xl
                                          text-white flex-shrink-0 flex-grow-0'>
                              <img className="object-contain w-full h-full rounded-full" src={resource.createdBy.imgUrl} />
                            </div>
                          ):(
                            <div className='w-full h-full flex justify-center
                                            items-center bg-primary-1 rounded-full
                                            text-xl 
                                            text-white'>
                              {resource.createdBy.name[0].toUpperCase()}
                            </div>
                          )}
                          <div className='mx-2 text-sm font-bold'>
                            {resource.createdBy.name.split(' ')[0]}
                          </div>
                        </div>
                        <div className='flex relative -right-[4.5rem]'>
                          <div className='resource-option'><FaEye /></div>
                          <div className='resource-option'><FaPencilAlt /></div>
                          <div className='resource-option' onClick={()=>{
                            setDeletingId(resource._id)
                            openModal()
                          }}><FaTrash /></div>
                        </div>
                      </div>
                    )
                  }
                })
              ):(
                <div>wow such empty</div>
              )}
            </div>
          ):(
            <div className='item-detailed-loading'>
              <div className='flex'>
                <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
                <div
                    className={`${circleCommonClasses} mr-1 animate-bounce200`}
                ></div>
                <div className={`${circleCommonClasses} animate-bounce400`}></div>
            </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
