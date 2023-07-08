import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaLink, FaImage, FaFile, FaPencilAlt, FaTrash, FaEye, FaPlus, FaFileAlt } from 'react-icons/fa'
import Modal from 'react-modal';
import config from '../config';
import EditNodeModal from './modals/EditNodeModal';
import LinkResourceModal from './modals/NewLinkResourceModal';
import TextResourceModal from './modals/NewTextResourceModal';
import NewImageResourceModel from './modals/NewImageResourceModel';
import DropDownButton from './components/DropDownButton';
import ViewImage from './modals/ViewImage';
import ViewText from './modals/ViewText';
export default function Item(props) {
  const [ItemData, setItemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expand, setExpand] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modal2IsOpen, setModal2IsOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState('');
  const [deleteStatus, setDeleteStatus] = useState(200);
  const [deletingType, setDeletingType] = useState(1);


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedResource, setSelectedResource] = useState(1);

  //Link
  const [isLinkResAddModalOpen, setIsLinkResAddModalOpen] = useState(false)
  const [isLinkResEditModalOpen, setIsLinkResEditModalOpen] = useState(false)

  const openLinkModal = (isEdit, res) => {
    if(isEdit) {
      setSelectedResource({
        ...res,
        link: res.data.link
      })
      setIsLinkResEditModalOpen(true);
    }else {
      setIsLinkResAddModalOpen(true)
    }
  }


  //Text
  const [viewedText, setViewedText] = useState();
  const [isViewTextOpen, setIsViewTextOpen] = useState(false);

  const [isTextResAddModalOpen, setIsTextResAddModalOpen] = useState(false);
  const [isTextResEditModalOpen, setIsTextResEditModalOpen] = useState(false);

  const openTextModal = (isEdit, res) => {
    if(isEdit) {
      setSelectedResource({
        ...res,
        text: res.data.text
      })
      setIsTextResEditModalOpen(true);
    }else {
      setIsTextResAddModalOpen(true)
    }
  }

  
  const [isAddImageResModalOpen, setIsAddImageResModalOpen] = useState(false)
  const [isViewImageOpen, setIsViewImageOpen] = useState(false)
  const [viewedImage, setViewedImage] = useState("")
  const getNodeColor = () => {
    switch (props.color) {
      case "purple":
        return `node-container node-purple`
      case "green":
        return `node-container node-green`
      case "pink":
        return `node-container node-pink`
      case "gray":
        return `node-container node-gray`
      case "yellow":
        return `node-container node-yellow`
      case "black":
        return `node-container node-black`
      case "blue":
        return `node-container node-blue`
      default:
        return `node-container`
    }
  }
  const getItemColor = () => {
    switch (props.color) {
      case "purple":
        return `item item-purple`
      case "green":
        return `item item-green`
      case "pink":
        return `item item-pink`
      case "gray":
        return `item item-gray`
      case "yellow":
        return `item item-yellow`
      case "black":
        return `item item-black`
      case "blue":
        return `item item-blue`
      default:
        return `item`
    }
  }
  const getResourceColor = () => {
    switch (props.color) {
      case "purple":
        return `resource resource-purple`
      case "green":
        return `resource resource-green`
      case "pink":
        return `resource resource-pink`
      case "gray":
        return `resource resource-gray`
      case "yellow":
        return `resource resource-yellow`
      case "black":
        return `resource resource-black`
      case "blue":
        return `resource resource-blue`
      default:
        return `resource`
    }
  }
  const openModal = (type) => {
    if (type === 1) {
      setDeletingType(1);
    } else if (type === 2) {
      setDeletingType(2);
    }
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
      .then((response) => {
        setDeleteResponse(response)
        getItemData()
        closeModal();
        openModal2();
      }).catch((err) => {
        setDeleteResponse(err)
        getItemData()
        closeModal();
        openModal2();
      });
  }
  const deleteNode = async (deletingId) => {
    fetch(config.BASE_URL + `/nodes/${deletingId}`, {
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
      .then((response) => {
        setDeleteResponse(response)
        closeModal();
        openModal2();
        props.update()
      }).catch((err) => {
        setDeleteResponse(err)
        closeModal();
        openModal2();
      });
  }
  let circleCommonClasses = 'h-2 w-2 bg-primary-1   rounded-full';
  const rootEl = document.getElementById('root');
  const getItemData = async (e) => {
    setIsLoading(true)
    fetch(config.BASE_URL + `/nodes/${props._id}`, {
      method: "GET",
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }).then((res) => res.json())
      .then((response) => {
        setIsLoading(false)
        setItemData(response.resources)
      }).catch((err) => {
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
            onClick={() => {
              if (deletingType === 1) {
                deleteNode(deletingId)
              } else if (deletingType === 2) {
                deleteResource(deletingId)
              }
            }}>Delete</div>
          <div className='bg-white text-black p-2 hover:cursor-pointer hover:bg-gray-300 rounded-md'
            onClick={() => { closeModal() }}>Cancel</div>
        </div>
      </Modal>
      <Modal
        appElement={rootEl}
        isOpen={modal2IsOpen}
        className={'h-1/6 w-1/6 left-[40%] top-1/3 absolute flex flex-col justify-between items-center border rounded-md bg-secondary-2 text-black'}
        shouldFocusAfterRender={false}
        onRequestClose={closeModal2}
      >
        {deleteStatus == 200 ? (
          <div className='w-full h-full bg-green-200 border border-green-400 flex justify-center items-center bg-opacity-50'>
            Deleted Successfully!
          </div>
        ) : (
          deleteResponse ? (
            <div className='w-full h-full bg-red-200 border border-red-400 flex justify-center items-center bg-opacity-50'>
              Resource Not Found!
            </div>
          ) : (
            <div className='w-full h-full bg-red-200 border border-red-400 flex justify-center items-center bg-opacity-50'>
              An Error Occured Try Again Later
            </div>
          )
        )}

      </Modal>

      {/* Link Modals */}
      <LinkResourceModal 
        isEdit={false}
        nodeId={props._id} 
        getItemData={getItemData} 
        isOpen={isLinkResAddModalOpen} 
        setIsOpen={setIsLinkResAddModalOpen} 
      />
      <LinkResourceModal
        isEdit={true}
        {...selectedResource}
        getItemData={getItemData} 
        isOpen={isLinkResEditModalOpen} 
        setIsOpen={setIsLinkResEditModalOpen} 
      />
      
      {/* Text Modals */}
      <TextResourceModal 
        isEdit={false} 
        nodeId={props._id} 
        getItemData={getItemData} 
        isOpen={isTextResAddModalOpen} 
        setIsOpen={setIsTextResAddModalOpen}
      />
      <TextResourceModal 
        isEdit={true} 
        {...selectedResource}
        getItemData={getItemData} 
        isOpen={isTextResEditModalOpen} 
        setIsOpen={setIsTextResEditModalOpen} 
      />
      <ViewText isOpen={isViewTextOpen} setIsOpen={setIsViewTextOpen} text={viewedText}/>
      
      <NewImageResourceModel getItemData={getItemData} isOpen={isAddImageResModalOpen} setIsOpen={setIsAddImageResModalOpen} nodeId={props._id} />
      <EditNodeModal nodeId={props._id} nodeOldName={props.name} nodeOldColor={props.color} isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} />
      <ViewImage isOpen={isViewImageOpen} setIsOpen={setIsViewImageOpen} imgUrl={viewedImage}/>
      <div id={props._id} className={getNodeColor()}>
        <div className={getItemColor()} onClick={() => {
          getItemData();
          setExpand(!expand)
        }}>
          <div className='relative -left-4 font-bold flex items-center w-1/3'> {props.name ? <div className='relative left-4'>{props.name}</div> : "-"}</div>

          <div className='flex'>

            <DropDownButton options={[
              { innerText: 'Link',  action: ()=>{setIsLinkResAddModalOpen(true)}  },
              { innerText: 'Text',  action: ()=>{openTextModal(false, null)}  },
              { innerText: 'Image', action: ()=>{setIsAddImageResModalOpen(true)} }
            ]} />
            
            <div className='node-option' onClick={() => {
              setDeletingId(props._id)
              openModal(1);
            }}><FaTrash /></div>
            <div className='node-option'
              onClick={() => { setIsEditModalOpen(true) }}><FaPencilAlt /></div>

            <div className='node-option'>{expand ? (<FaArrowDown />) : (<FaArrowUp />)}</div>
          </div>
        </div>
        {expand &&
          (!isLoading ? (
            <div className='item-detailed'>
              {ItemData.length > 0 ? (
                ItemData.map((resource, index) => {
                  if (resource.type === "LINK") {
                    return (
                      <div 
                        onClick={() => {
                          window.open(resource.data.link)
                        }}
                        key={index}
                        id={resource._id} 
                        className={getResourceColor()} 
                        draggable>

                        <div className='mx-3'><FaLink /></div>
                        <div className='w-[50%] mr-2' >{resource.name}</div>
                        <div className='flex items-center justify-start w-[30%] relative'>
                          {resource.createdBy.imgUrl ? (
                            <div className='w-7 h-7 flex justify-center items-center
                                          bg-primary-1 rounded-full text-xl
                                          text-white flex-shrink-0 flex-grow-0'>
                              <img className="object-contain w-full h-full rounded-full" src={resource.createdBy.imgUrl} />
                            </div>
                          ) : (
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
                          <div className='resource-option' onClick={(e) => {
                            e.stopPropagation()
                            openLinkModal(true, resource);
                          }}><FaPencilAlt /></div>
                          <div className='resource-option' onClick={() => {
                            setDeletingId(resource._id)
                            openModal(2)
                          }}><FaTrash /></div>
                        </div>
                      </div>
                    )
                  } else if (resource.type === "TEXT") {
                    return (
                      <div key={index} id={resource._id} className={getResourceColor()} draggable
                        onClick={() => {
                          setViewedText(resource.data.text);
                          setIsViewTextOpen(true);
                        }}
                      >
                        <div className='mx-3'><FaFileAlt /></div>
                        <div className='w-[50%] mr-2'>{resource.name}</div>
                        <div className='flex items-center justify-start w-[30%] relative'>
                          {resource.createdBy.imgUrl ? (
                            <div className='w-7 h-7 flex justify-center items-center
                                          bg-primary-1 rounded-full text-xl
                                          text-white flex-shrink-0 flex-grow-0'>
                              <img className="object-contain w-full h-full rounded-full" src={resource.createdBy.imgUrl} />
                            </div>
                          ) : (
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
                          <div className='resource-option' onClick={(e) => {
                            e.stopPropagation()
                            openTextModal(true, resource)
                          }}><FaPencilAlt /></div>
                          <div className='resource-option' onClick={(e) => {
                            e.stopPropagation()
                            setDeletingId(resource._id)
                            openModal(2)
                          }}><FaTrash /></div>
                        </div>
                      </div>
                    )
                  } else if (resource.type === "IMAGE") {
                    return (
                      <div key={index} id={resource._id} className={getResourceColor()} draggable onClick={() => {
                        setViewedImage(resource.data.imageUrl)
                        setIsViewImageOpen(true);
                      }}>
                        <div className='mx-3'><FaImage /></div>
                        <div className=' w-[50%] mr-2'>{resource.name}</div>
                        <div className='flex items-center justify-start w-[30%] relative'>
                          {resource.createdBy.imgUrl ? (
                            <div className='w-7 h-7 flex justify-center items-center
                                          bg-primary-1 rounded-full text-xl
                                          text-white flex-shrink-0 flex-grow-0'>
                              <img className="object-contain w-full h-full rounded-full" src={resource.createdBy.imgUrl} />
                            </div>
                          ) : (
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
                          <div className='resource-option' onClick={(e) => {
                            e.stopPropagation()
                            setDeletingId(resource._id)
                            openModal(2)
                          }}><FaTrash /></div>
                        </div>
                      </div>
                    )
                  }
                })
              ) : (
                <div className='w-full flex justify-center items-center'>wow such empty, Click + to add resources</div>
              )}
            </div>
          ) : (
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
