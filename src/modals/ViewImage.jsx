import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
export default function ViewImage({isOpen, setIsOpen, imgUrl}) {
  const [error, setError] = useState('')
  const closeViewImage = () => {
    setIsOpen(false);
  }
  return (
    <div>
      <Modal
        appElement={document.getElementById('root')}
        isOpen={isOpen}
        className={'-translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-full w-full absolute flex justify-between items-center border  rounded-md text-black'}
        shouldFocusAfterRender={false}
        onRequestClose={closeViewImage}
      >
        <div className='bg-black w-full h-full bg-opacity-70' onClick={()=>{setIsOpen(false)}}>
          <div className='p-3 bg-secondary-3 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2  flex justify-between items-center border rounded-md'>
            {imgUrl}
            <img className='w-96' src={imgUrl} alt="" />
          </div>
        </div>

      </Modal>
    </div>
  )
}
