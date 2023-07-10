import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import config from '../../config';

export default function UnitModal({ isOpen, setIsOpen, isEdit, name:oldName, description:oldDescription, coverUrl, _id }) {
    const nav = useNavigate();

    const [unitName, setUnitName] = useState('')
    const [unitDescription, setUnitDescription] = useState('')
    const [error, setError] = useState(' ')

    useEffect(() => {
        if(isEdit) {
            setUnitName(oldName)
            setUnitDescription(oldDescription)
            setSelectedFile(null)
        }
    }, [])

    const closeModal = () => {
        setError(' ')
        setIsOpen(false);
    }

    // Upload Image
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {

        if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpg') {
            setSelectedFile(event.target.files[0]);
            setIsFilePicked(true);
            const output = document.getElementById('preview1')
            output.src = URL.createObjectURL(event.target.files[0]);
        } else {
            setError("Image Type must be JPG, JPEG or PNG")
        }
    };

    const handleSubmission = () => {
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
            if(isEdit) {
                editUnit(result.message)
            }else {
                createNewUnit(result.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        }else if(isEdit) {
            editUnit(coverUrl)
        }
    };

    const editUnit = (coverUrl) => {
        if (!unitName) {
            setError('Please provide name for the unit')
            const classList = document.getElementById('Unit-Name').classList;
            classList.replace('border-primary-1', 'border-red-700')
            classList.replace('border', 'border-2')

            const nameLabel = document.getElementById('Unit-Name-Lable').classList;
            nameLabel.add('text-red-700', 'font-bold')

            return
        }

        fetch(config.BASE_URL + '/units/' + _id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(
                {
                    name: unitName,
                    description: unitDescription,
                    coverUrl: coverUrl
                }
            )
        }).then(result => {
            if (result.error) {
                setError(result.error)
                return
            }
            nav(0)
        }).catch(error => {
            console.log(error);
        })
    }

    const createNewUnit = (newCoverUrl) => {
        if (!unitName) {
            setError('Please provide name for the unit')
            const classList = document.getElementById('Unit-Name').classList;
            classList.replace('border-primary-1', 'border-red-700')
            classList.replace('border', 'border-2')

            const nameLabel = document.getElementById('Unit-Name-Lable').classList;
            nameLabel.add('text-red-700', 'font-bold')

            return
        }

        fetch(config.BASE_URL + '/units', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(
                {
                    name: unitName,
                    description: unitDescription,
                    coverUrl: newCoverUrl
                }
            )
        }).then(res => {

            return res.json()
        })
            .then(result => {
                if (result.error) {
                    setError(result.error)
                    return
                }
                nav(`/unit/${result._id}`)
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <Modal
                appElement={document.getElementById('root')}
                isOpen={isOpen}
                className={'h-fit w-1/3 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 absolute flex flex-col justify-center items-center border p-5 rounded-md bg-secondary-2 text-black'}
                onRequestClose={closeModal}
                shouldFocusAfterRender={false}
            >
                <div><span className='text-sm ml-1 text-red-600 font-bold'>{error}</span></div>
                <div className='w-full'>
                    <div><label htmlFor="Unit-Name" id='Unit-Name-Lable' className='text-sm ml-1'>Name</label></div>
                    <input id='Unit-Name' className='text-sm w-full my-1 h-8 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 ' type='text' value={unitName}
                        onChange={(e) => {
                            setUnitName(e.target.value)
                        }}
                    />
                </div>

                <div className='w-full'>
                    <div><label htmlFor="Unit-Description" className='text-sm ml-1'>Description</label></div>
                    <textarea id='Unit-Description' className='resize-none text-sm w-full max-h-md my-1 h-16 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 ' type='text' value={unitDescription}
                        onChange={(e) => {
                            setUnitDescription(e.target.value)
                        }} />
                </div>

                <div className='w-full'>
                    <div><label htmlFor="Res-Text" className='text-sm ml-1'>Image</label></div>
                    <input id='Res-Text' className='resize-none text-sm w-full max-h-md my-1 h-16 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 '
                        type='file'
                        accept='.jpg, .jpeg, .png'
                        onChange={changeHandler} />
                    <div className='w-full flex justify-center bg-secondary-3 rounded-md border border-primary-1 p-2 mb-1'>
                        <img className='w-96 border-2 rounded-md max-h-80 ' id='preview1' src={coverUrl} />
                    </div>
                </div>

                <div className='w-full'>
                    <button className="w-full  h-9 rounded-md border text-sm bg-primary-2 text-white hover:bg-primary-1"
                        onClick={handleSubmission}
                    >{isEdit ? 'Save' : 'Create'}</button>
                </div>

            </Modal>
        </div>
    )
}
