import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import config from '../../config'
import { useParams } from 'react-router'
import LoadingDefault from '../components/LoadingDefault';
import { toast } from 'react-toastify';

const errorToast = { render: 'Failed!', type: 'error', isLoading: false, autoClose: true, closeButton: true };
const successToast = { render: 'Added Successfully!', type: 'success', isLoading: false, autoClose: true, closeButton: true };

export default function NewNodeModal({ isOpen, setIsOpen, loadNodes }) {

  const params = useParams();

  const [nodeName, setNodeName] = useState('')
  const [nodeColor, setNodeColor] = useState('yellow')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const finalCloseNewNodeModal = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 1000)
  }

  const closeNewNodeModal = () => {
    setIsLoading(false)
    setIsOpen(false);
  }

  const selectColor = (e) => {

    if (nodeColor) document.getElementById(nodeColor).classList.remove('border-2', 'border-black')

    setNodeColor(e.target.id)

    e.target.classList.add('border-2', 'border-black');

  }

  const createNewNode = () => {
    setIsLoading(true)
    if (!nodeName) {
      setIsLoading(false)
      setError('Please provide name for the node')
      const classList = document.getElementById('Node-Name').classList;
      classList.replace('border-primary-1', 'border-red-700')
      classList.replace('border', 'border-2')

      const nameLabel = document.getElementById('Node-Name-Lable').classList;
      nameLabel.add('text-red-700', 'font-bold')

      return
    }

    finalCloseNewNodeModal()

    const toastId = toast.loading("Adding Node...")

    fetch(config.BASE_URL + '/nodes/' + params.id, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify(
        {
          name: nodeName,
          color: nodeColor
        }
      )
    }).then(res => {
      setIsLoading(false)
      return res.json()
    })
      .then(result => {
        if (result.error) {
          setError(result.error)
          toast.update(toastId, errorToast)
          return
        }
        toast.update(toastId, successToast)
        loadNodes(params.id)
      }).catch(error => {
        toast.update(toastId, errorToast)
        console.log(error);
      })
  }

  return (
    <div>
      <Modal
        appElement={document.getElementById('root')}
        isOpen={isOpen}
        className={'h-1/3 w-1/3 left-1/3 top-1/3 absolute flex flex-col justify-between items-center border p-5 rounded-md bg-secondary-2 text-black'}
        shouldFocusAfterRender={false}
        onRequestClose={closeNewNodeModal}
      >
        {isLoading && <LoadingDefault />}
        <div><span className='text-sm ml-1 text-red-600 font-bold'>{error}</span></div>
        <div className='w-full'>
          <div><label htmlFor="Node-Name" id='Node-Name-Lable' className='text-sm ml-1'>Name</label></div>
          <input
            id='Node-Name'
            className='text-sm w-full my-1 h-8 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 '
            type='text'
            onChange={(e) => {
              setNodeName(e.target.value)
            }}
          />
        </div>

        <div className='w-full'>
          <div><label htmlFor="Node-Color" className='text-sm ml-1'>Color</label></div>
          <div className='w-full flex justify-center items-center'>
            <div className='flex justify-center items-center border-slate-600 border rounded-sm'>
              <div id='yellow' onClick={selectColor} className='bg-yellow-3 hover:bg-opacity-80 h-10 w-10'></div>
              <div id='green' onClick={selectColor} className='bg-green-3 hover:bg-opacity-80 h-10 w-10'></div>
              <div id='pink' onClick={selectColor} className='bg-pink-3 hover:bg-opacity-80 h-10 w-10'></div>
              <div id='purple' onClick={selectColor} className='bg-purple-3  hover:bg-opacity-80 h-10 w-10'></div>
              <div id='blue' onClick={selectColor} className='bg-blue-3 over:bg-opacity-80 h-10 w-10'></div>
              <div id='gray' onClick={selectColor} className='bg-gray-3 hover:bg-opacity-80 h-10 w-10'></div>
              <div id='black' onClick={selectColor} className='bg-black-3  hover:bg-opacity-80 h-10 w-10'></div>
            </div>
          </div>
        </div>

        <div className='w-full'>
          <button className="w-full  h-9 rounded-md border text-sm bg-primary-2 text-white hover:bg-primary-1"
            onClick={createNewNode}
          >Create Node</button>
        </div>

      </Modal>
    </div>
  )
}
