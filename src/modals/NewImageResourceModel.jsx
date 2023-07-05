import React from 'react'
import Modal from 'react-modal'
import config from '../../config'
import { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function NewImageResourceModel({isOpen, setIsOpen, nodeId, getItemData}) {

    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState('')

    const closeNewResModal = () => {
        setIsOpen(false);
    }

    const addResource = (nodeId, imageUrl) => {
        fetch(config.BASE_URL + '/resource/' + nodeId , {
            method:"POST",
            headers:  { 
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

        }).catch((err) => {
            console.log(err);
        })
    }

  return (
    <div>
        <Modal
        appElement={document.getElementById('root')}
        isOpen={isOpen}
        className={'h-72 w-1/3 left-1/3 top-1/3 absolute flex flex-col justify-between items-center border p-5 rounded-md bg-secondary-2 text-black'}
        shouldFocusAfterRender={false}
        onRequestClose={closeNewResModal}
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
            <div><label htmlFor="Res-Text" className='text-sm ml-1'>Text</label></div>
            <input  id='Res-Text'  className='resize-none text-sm w-full max-h-md my-1 h-16 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 '
            type='file'
            accept='.jpg, .jpeg, .png'
            onSubmit={handleSubmit(async (data) => {
                const formData = new FormData();
                formData.append("file", data.file[0]);
        
                const res = await fetch(config.BASE_URL + '/upload', {
                    method: "POST",
                    body: formData,
                }).then((res) => res.json());
                setUrl( config.BASE_URL + res.message)
            })} 
            {...register("file")}/>
        </div>

        <div className='w-full'>
            <button className="w-full  h-9 rounded-md border text-sm bg-primary-2 text-white hover:bg-primary-1"
              onClick={() => {
                if(name ) {
                    if(!url) {
                        setError('Please Add file')
                        return
                    } 

                    addResource(nodeId, url);
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
