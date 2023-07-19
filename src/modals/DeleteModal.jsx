import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import config from '../../config'
import { LoadNodesContext } from '../pages/ViewUnit/ViewUnit';
import { useNavigate } from 'react-router-dom';

export default function DeleteModal({ isOpen, setIsOpen, getItemData, nodeId, deleteType, _id: id }) {

    const nav = useNavigate()

    const [message, setMessage] = useState(false)

    const rerenderNote = useContext(LoadNodesContext);

    const deleteRequest = () => {
        if (deleteType === 'RESOURCE') {
            fetch(config.BASE_URL + '/resource/' + id, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            }).then(res => {
                setMessage(true)
            }).catch((e) => {
                console.log(e);
            })
        } else if (deleteType === 'NODE') {
            fetch(config.BASE_URL + '/nodes/' + id, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            }).then(res => {
                setMessage(true)
            }).catch((e) => {
                console.log(e);
            })
        } else if( deleteType === 'UNIT') {
            fetch(config.BASE_URL + '/units/' + id, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            }).then(res => {
                setMessage(true)
            }).catch((e) => {
                console.log(e);
            })
        }
    }

    const closeModal = () => {
        if(message) {
            if(deleteType === 'RESOURCE') {
                getItemData(nodeId)
            }else if(deleteType === 'NODE') {
                rerenderNote()
            }else if(deleteType === 'UNIT') {
                nav('/resources')
            }
        }
        setMessage(false)
        setIsOpen(false);
    }

    return (
        <div>
            <Modal
                appElement={document.getElementById('root')}
                isOpen={isOpen}
                className={'-translate-x-1/3 shadow-xl shadow-slate-300 -translate-y-1/3 left-1/2 top-1/2 h-40 w-72 absolute flex flex-col justify-around items-center border p-5 rounded-md bg-secondary-2 text-black'}
                shouldFocusAfterRender={false}
                onRequestClose={closeModal}
                closeTimeoutMS={200}
            >
                <div onClick={(e) => {e.stopPropagation()}}>
                {!message ? (
                    <div>
                        <div className='font-bold text-center'>
                            Are you sure you want to delete this {deleteType.toLowerCase()}?
                        </div>
                        <div className='flex justify-center space-x-9 items-center mt-3'>
                            <div className='bg-primary-1 text-white p-2 hover:cursor-pointer hover:bg-primary-2 rounded-md shadow-lg'
                                onClick={deleteRequest}>Delete</div>
                            <div className='bg-white text-black p-2 hover:cursor-pointer hover:bg-gray-300 rounded-md'
                                onClick={closeModal}>Cancel</div>
                        </div>
                    </div>
                ) :  (
                    <div>
                        <div className='font-bold text-center'>
                            {deleteType.toLowerCase()} deleted successfully
                        </div>
                    </div>
                )}
                </div>
            </Modal>
        </div>
    )
}
