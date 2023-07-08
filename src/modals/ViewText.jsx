import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
export default function ViewText({isOpen, setIsOpen, text}) {
  const closeViewText = () => {
    setIsOpen(false);
  }
  return (
    <div>
      <Modal
        appElement={document.getElementById('root')}
        isOpen={isOpen}
        className={'-translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-full w-full absolute flex justify-between items-center border  rounded-md text-black'}
        shouldFocusAfterRender={false}
        onRequestClose={closeViewText}
      >
        <div className='bg-black w-full h-full bg-opacity-70' onClick={()=>{setIsOpen(false)}}>
          <div className='p-3 bg-secondary-3 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2  flex justify-between items-center border rounded-md'>
            <span className='w-96'>{text}</span>
          </div>
        </div>

      </Modal>
    </div>
  )
}
