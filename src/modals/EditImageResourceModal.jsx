import React, { useEffect } from 'react'
import Modal from 'react-modal'
import config from '../../config'
import { useState } from 'react'

export default function EditImageResourceModel({isOpen, setIsOpen, _id:id, oldName, imageUrl, getItemData}) {

    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [isFilePicked, setIsFilePicked] = useState(false);

    useEffect(() => {
        setName(oldName)
        setSelectedFile(null)
    }, [oldName])

    const closeNewResModal = () => {    
      setSelectedFile(null) 
      setIsOpen(false);
    }

    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
      if(event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpg') {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        const output = document.getElementById('preview')
        output.src = URL.createObjectURL(event.target.files[0]);
      }else {
        setError("Image Type must be JPG, JPEG or PNG")
      }
    };

    const handleSubmission = () => {
    if(selectedFile){
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
          editResource(id, result.message);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }else {
        editResource(id, null)
    }
      
    };

    const editResource = (resourceId, imageUrl) => {
        if(imageUrl) {
            fetch(config.BASE_URL + '/resource/' + resourceId , {
                method:"PUT",
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
            }).then(result => {
              getItemData() 
              closeNewResModal()
            }).catch((err) => {
              console.log(err);
            })
        }else {
            fetch(config.BASE_URL + '/resource/' + resourceId , {
                method:"PUT",
                headers:  { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                },
                body: JSON.stringify(
                    {
                      name: name,
                    }
                )
            }).then(result => {
              getItemData() 
              closeNewResModal()
            }).catch((err) => {
              console.log(err);
            })
        }
    }

  return (
    <div>
        <Modal
            appElement={document.getElementById('root')}
            isOpen={isOpen}
            className={'h-fit w-1/3 left-1/2 top-1/2 shadow-xl shadow-slate-300 -translate-y-1/2 -translate-x-1/2 absolute flex flex-col justify-between items-center border p-5 rounded-md bg-secondary-2 text-black'}
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
             value={name}
             onChange={(e) => {
                setName(e.target.value)
             }}
            />
        </div>

        <div className='w-full'>
            <div><label htmlFor="Res-Text" className='text-sm ml-1'>Image</label></div>
            <input  id='Res-Text'  className='resize-none text-sm w-full max-h-md my-1 h-16 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 '
            type='file'
            accept='.jpg, .jpeg, .png'
            onChange={changeHandler}/>
            <div className='w-full flex justify-center bg-secondary-3 rounded-md border border-primary-1 p-2 mb-1'>
              <img className='w-96 border-2 rounded-md max-h-80 ' id='preview' src={imageUrl} />
            </div>
        </div>

        <div className='w-full'>
            <button className="w-full  h-9 rounded-md border text-sm bg-primary-2 text-white hover:bg-primary-1"
              onClick={() => {
                if(name) {
                    handleSubmission();
                }
                else {
                    setError('Please provide name or image for the resource')
                }
              }}
            >Save</button>
        </div>

      </Modal>
    </div>
  )
}
