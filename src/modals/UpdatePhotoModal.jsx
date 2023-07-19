import React, { useState } from 'react'
import Modal from 'react-modal'
import config from '../../config'
import { useNavigate } from 'react-router-dom'
import LoadingDefault from '../components/LoadingDefault'
export default function UpdatePhotoModal({isOpen, setIsOpen, photo}) {
    const [error, setError] = useState("")
    const [isFilePicked, setIsFilePicked] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const nav = useNavigate()
    const closeModal = ()=>{
        setIsOpen(false)
        setIsLoading(false)
    }
    const update = (url) => {
        fetch(config.BASE_URL + '/users' , {
            method: 'PUT',
            headers:  { 
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(
              {
                imgUrl: url
              }
            )
          }).then(res => {
            const user = JSON.parse(localStorage.getItem('user'))
            user.imgUrl = url
            localStorage.setItem('user', JSON.stringify(user))
            setIsLoading(false)
            closeModal()
            nav(0)
          })
          .catch(error => {
            console.log(error);
          })
    }
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
        setIsLoading(true)
        if(selectedFile) {
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
            update(result.message)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        }else {
            closeModal()
        }
    };

  return (
    <div>
        <Modal
            appElement={document.getElementById('root')}
            isOpen={isOpen}
            className={'shadow-xl shadow-slate-300 h-fit w-1/3 left-1/2 top-1/3 -translate-y-1/4 -translate-x-1/2 absolute flex flex-col justify-center items-center border p-5 rounded-md bg-secondary-2 text-black'}
            onRequestClose={closeModal}
            shouldFocusAfterRender={false}
            closeTimeoutMS={200}
        >
            {isLoading&&(
                <LoadingDefault />
            )}
            <div><span className='text-sm ml-1 text-red-600 font-bold'>{error}</span></div>
            <div className='w-full flex justify-center items-start h-20'>
                <div><label id='Unit-Name-Lable' className='text-2xl ml-1 font-bold'>Change Profile Picture</label></div>
            </div>

            <div className='w-full'>
                <div className='w-full flex justify-center bg-secondary-3 rounded-md border border-primary-1 p-2 mb-1'>
                    <div className='relative w-60 h-60 flex justify-center items-center rounded-full border-4 border-white'>
                        <img id='preview' className='object-cover w-full h-full flex-shrink-0 rounded-full' src={photo?photo:"https://cdn-icons-png.flaticon.com/512/149/149071.png"} onError={() => { document.getElementById(`profile-pic`).src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} />
                    </div>
                </div>
                <div className='w-full flex justify-center items-center h-20'>
                    <input id='Res-Text' className='hidden'
                        type='file'
                        accept='.jpg, .jpeg, .png'
                        onChange={changeHandler} />
                    <label className='w-32 h-10 bg-primary-2 border-2 text-white flex justify-center items-center hover:cursor-pointer hover:bg-primary-1 trans' htmlFor='Res-Text'>Upload</label>
                </div>
            </div>
            <div className='w-full'>
                <button className="w-full  h-9 rounded-md border text-sm bg-primary-2 text-white hover:bg-primary-1 trans"
                    onClick={handleSubmission}
                >Save</button>
            </div>
        </Modal>
    </div>
  )
}
