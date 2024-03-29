import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import config from '../../config'
import { LoadNodesContext } from '../pages/ViewUnit/routes/ViewNodes'
export default function LinkResourceModal({ isOpen, isEdit, setIsOpen, nodeId, getItemData, _id, link: oldlink, name: oldname }) {

    const [name, setName] = useState('')
    const [embedName, setEmbedName] = useState('')
    const [link, setLink] = useState('')
    const [error, setError] = useState('')

    const [input1, setInput1] = useState(true)
    const [input2, setInput2] = useState(false)

    useEffect(() => {
        setName(oldname)
        setLink(oldlink)
    }, [oldname])

    const finalCloseNewResModal = () => {
        setTimeout(() => {
            setEmbedName('')
            setIsOpen(false);
        }, 1000)
    }

    const closeNewResModal = () => {
        setTimeout(() => {
            setEmbedName('')
            setIsOpen(false);
        }, 1000)
    }

    const getEmbedName = (link) => {
        fetch(config.BASE_URL + '/oembed', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(
                {
                    url: link
                }
            )
        }).then(res => res.json())
            .then(result => {
                if (result.status !== 404) {
                    setEmbedName(result.title)
                    console.log(result.title);
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    const addResource = (nodeId) => {
        finalCloseNewResModal()

        fetch(config.BASE_URL + '/resource/' + nodeId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(
                {
                    name: (!input1) ? name : embedName,
                    type: 'LINK',
                    data: {
                        link: link
                    }
                }
            )
        }).then(res => res.json())
            .then(result => {

                getItemData()
            }).catch(err => {
                console.log(err);
            })
    }

    const editResource = (resId) => {
        finalCloseNewResModal()

        fetch(config.BASE_URL + '/resource/' + resId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(
                {
                    name: (!input1) ? name : embedName,
                    type: 'LINK',
                    data: {
                        link: link
                    }
                }
            )
        }).then(result => {
            getItemData()
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <Modal
                appElement={document.getElementById('root')}
                isOpen={isOpen}
                className={'shadow-xl shadow-slate-300 h-72 w-1/3 left-1/3 top-1/3 absolute flex flex-col justify-between items-center border p-5 rounded-md bg-secondary-2 text-black'}
                shouldFocusAfterRender={false}
                onRequestClose={closeNewResModal}
                closeTimeoutMS={200}
            >

                <div><span className='text-sm ml-1 text-red-600 font-bold'>{error}</span></div>
                <div className='w-full'>
                    <div><label htmlFor="Res-Link" id='Res-Link-Lable' className='text-sm ml-1'>Link</label></div>
                    <input
                        id='Res-Link'
                        className='text-sm w-full my-1 h-8 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 '
                        type='text'
                        value={link}
                        onChange={(e) => {
                            const inputLink = e.target.value

                            setLink(inputLink)

                            getEmbedName(inputLink);
                        }}
                        placeholder='https://www.example.com'
                    />
                </div>

                <fieldset className='w-full mb-3'>
                    <div><label htmlFor="Node-Name" id='Node-Name-Lable' className='text-sm ml-1'>Name</label></div>
                    <div className='flex flex-row justify-around'>
                        <input type='radio' name='name' className='inline mx-4'
                            onClick={(e) => {
                                setInput1(!input1)
                                setInput2(!input2)
                            }}

                        />
                        <input
                            id='Node-Name'
                            className='inline text-sm my-1 w-full h-8 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 '
                            type='text'
                            disabled={input1}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            placeholder='custome name'
                        />
                    </div>
                    <div className='flex flex-row justify-around'>
                        <input type='radio' name='name' className='inline mx-4' defaultChecked={true}
                            onClick={(e) => {
                                setInput1(!input1)
                                setInput2(!input2)
                            }}
                        />
                        <input
                            id='Node-Name'
                            className='inline text-sm my-1 w-full h-8 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 '
                            type='text'
                            disabled={input2}
                            value={embedName}
                            onChange={(e) => {
                                setEmbedName(e.target.value)
                            }}
                            placeholder='embed name'
                        />
                    </div>
                </fieldset>

                <div className='w-full'>
                    <button className="w-full  h-9 rounded-md border text-sm bg-primary-2 text-white hover:bg-primary-1"
                        onClick={() => {
                            if ((!input1 && name) || (!input2 && embedName)) {
                                isEdit ? editResource(_id) : addResource(nodeId)
                            }
                            else {
                                setError('Please provide name for the resource')
                            }

                        }}
                    >{isEdit ? 'Save' : 'Create Resource'}</button>
                </div>

            </Modal>
        </div>
    )
}
