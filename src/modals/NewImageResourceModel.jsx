import React from 'react'
import Modal from 'react-modal'
import config from '../../config'
import { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function NewImageResourceModel({ isOpen, setIsOpen, nodeId, getItemData }) {

  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const closeNewResModal = () => {
    setName('')
    setError('')
    setSelectedFile(null)
    setIsFilePicked(false)
    setIsOpen(false);
  }

  const finalCloseNewResModal = () => {
    setTimeout(() => {
      setName('')
      setError('')
      setSelectedFile(null)
      setIsFilePicked(false)
      setIsOpen(false);
    }, 1000)
  }

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    
    if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpg') {
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
      const output = document.getElementById('preview')
      output.src = URL.createObjectURL(event.target.files[0]);
    } else {
      setError("Image Type must be JPG, JPEG or PNG")
    }
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append('file', selectedFile);

    fetch(
      config.BASE_URL + '/upload',
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        addResource(nodeId, result.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const addResource = (nodeId, imageUrl) => {
    finalCloseNewResModal()
    
    fetch(config.BASE_URL + '/resource/' + nodeId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify(
        {
          name: name,
          type: 'IMAGE',
          data: {
            imageUrl: imageUrl
          }
        }
      )
    }).then(res => res.json())
      .then(result => {
        getItemData()
      }).catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <Modal
        appElement={document.getElementById('root')}
        isOpen={isOpen}
        className={'shadow-xl shadow-slate-300 h-fit w-1/3 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 absolute flex flex-col justify-between items-center border p-5 rounded-md bg-secondary-2 text-black'}
        shouldFocusAfterRender={false}
        onRequestClose={closeNewResModal}
        closeTimeoutMS={200}
      >

        <div><span className='text-sm ml-1 text-red-600 font-bold'>{error}</span></div>
        <div className='w-full'>
          <div><label htmlFor="Res-Name" id='Res-Name-Lable' className='text-sm ml-1'>Name</label></div>
          <input
            id='Res-Name'
            className='text-sm w-full my-1 h-8 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 '
            type='text'
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>

        <div className='w-full'>
          <div><label htmlFor="Res-Text" className='text-sm ml-1'>Image</label></div>
          <input id='Res-Text' className='resize-none text-sm w-full max-h-md my-1 h-16 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 '
            type='file'
            accept='.jpg, .jpeg, .png'
            onChange={changeHandler} />
          <div className='w-full flex justify-center bg-secondary-3 rounded-md border border-primary-1 p-2 mb-1'>
            <img className='w-96 border-2 rounded-md max-h-80 ' id='preview' src='' />
          </div>
        </div>

        <div className='w-full'>
          <button className="w-full  h-9 rounded-md border text-sm bg-primary-2 text-white hover:bg-primary-1"
            onClick={() => {
              if (name) {
                handleSubmission();
              }
              else {
                setError('Please provide name or image for the resource')
              }
            }}
          >Create Resource</button>
        </div>

      </Modal>
    </div>
  )
}
