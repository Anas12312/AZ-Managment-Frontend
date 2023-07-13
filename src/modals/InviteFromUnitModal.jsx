import React from 'react'
import Modal from 'react-modal'
export default function InviteFromUnitModal({setIsOpen, isOpen}) {
    const closeModal = ()=>{
        setIsOpen(false)
    }
  return (
    <div>
        <Modal
            appElement={document.getElementById('root')}
            isOpen={isOpen}
            className={'-translate-x-1/3 -translate-y-1/3 left-1/2 top-1/2 h-40 w-72 absolute flex flex-col justify-around items-center border p-5 rounded-md bg-secondary-2 text-black'}
            shouldFocusAfterRender={false}
            onRequestClose={closeModal}
        >
            <div>
                Anas Hesham
            </div>
        </Modal>
    </div>
  )
}
