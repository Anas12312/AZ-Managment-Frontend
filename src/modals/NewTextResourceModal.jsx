import React, { useEffect } from 'react'
import Modal from 'react-modal'
import config from '../../config'
import { LoadNodesContext } from '../pages/ViewUnit/ViewUnit'
import { useState } from 'react'
export default function TextResourceModal({isOpen, setIsOpen, nodeId, getItemData, isEdit, res}) {

    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
      if(isEdit && res) {
        setName(res.name)
        setText(res.text)
      }
    }, [])

    const closeNewResModal = () => {
      setName('')
      setText('')
      setError('')
      setIsOpen(false);
    }

    const addResource = (nodeId) => {
        fetch(config.BASE_URL + '/resource/' + nodeId , {
            method:"POST",
            headers:  { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(
                {
                  name: name,
                  type: 'TEXT',
                  data: {
                    text: text
                  }
                }
            )
        }).then(res => res.json())
        .then(result => {
            getItemData()
            closeNewResModal()
        }).catch(err => {
            console.log(err);
        })
    }

    const editResource = (resId) => {
      fetch(config.BASE_URL + '/resource/' + resId , {
          method:"PUT",
          headers:  { 
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem('token')
          },
          body: JSON.stringify(
              {
                name: name,
                type: 'TEXT',
                data: {
                  text: text
                }
              }
          )
      }).then(res => res.json())
      .then(result => {
          getItemData()
          closeNewResModal()
      }).catch(err => {
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
             value={name}
             onChange={(e) => {
                setName(e.target.value)
             }}
            />
        </div>

        <div className='w-full'>
            <div><label htmlFor="Res-Text" className='text-sm ml-1'>Text</label></div>
            <textarea  
              id='Res-Text'
              className='resize-none text-sm w-full max-h-md my-1 h-16 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 '
              type='text'
              value={text}
            onChange={(e) => {
              setText(e.target.value)
            }} />
        </div>

        <div className='w-full'>
            <button className="w-full  h-9 rounded-md border text-sm bg-primary-2 text-white hover:bg-primary-1"
              onClick={() => {
                if(name && text) {
                    isEdit ? editResource(res._id) : addResource(nodeId)
                }
                else {
                    setError('Please provide name or text for the resource')
                }

              }}
            >Create Resource</button>
        </div>

      </Modal>
    </div>
  )
}
