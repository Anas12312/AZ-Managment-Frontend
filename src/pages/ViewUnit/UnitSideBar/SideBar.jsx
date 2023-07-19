import React, { useState } from 'react'
import SideBarItem from '../../../components/SideBar/SideBarItem/SideBarItem'
import { FaStar, FaUser, FaFile, FaClock, FaPlus, FaCog } from 'react-icons/fa'
import InviteFromUnitModal from '../../../modals/InviteFromUnitModal'
import Modal from 'react-modal'
import config from '../../../../config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const errorToast = { type: 'error', isLoading: false, autoClose: true, closeButton: true };
const successToast = { type: 'success', isLoading: false, autoClose: true, closeButton: true };

export default function UnitSideBar({ selected, unitId, isOwner, isLoading }) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

  const nav = useNavigate()

  const leaveUnit = () => {
    setConfirmModalIsOpen(false)
    const toastId = toast.loading('Leaving Unit...')

    fetch(config.BASE_URL + '/units/leave/' + unitId, {
      method: 'DELETE',
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }).then(res => res.json())
      .then(result => {
        if (result.error) {
          toast.update(toastId, { render: result.error, ...errorToast })
          return
        }
        toast.update(toastId, { render: 'Left Successfully!', ...successToast })
        nav('/resources')
      })
      .catch(e => {
        console.log(e);
        toast.update(toastId, { render: 'Failed!', ...errorToast })
      });
  }

  return (

    <div className='relative flex flex-col h-full max-h-screen flex-grow w-72 pt-3 bg-gray-400 bg-opacity-10'>
      <Modal
        className={'-translate-x-1/3 -translate-y-1/3 left-1/2 top-1/2 h-40 w-72 absolute flex flex-col justify-around items-center border shadow-xl shadow-slate-300  p-5 rounded-md bg-secondary-2 text-black'}
        isOpen={confirmModalIsOpen}
        onRequestClose={() => setConfirmModalIsOpen(false)}
        appElement={document.getElementById('root')}
        shouldFocusAfterRender={false}
        closeTimeoutMS={200}
      >
        <div className='flex flex-col justify-center items-center p-2'>
          <div className='flex justify-center items-center text-center mb-2 font-bold'>
            <span>Are you sure you want to leave this unit?</span>
          </div>
          <div className='w-full  flex justify-evenly items-center'>
            <div
              onClick={leaveUnit}
              className='h-12 bg-red-600 trans hover:bg-red-700 rounded-md text-white w-[40%] flex justify-center items-center font-bold cursor-pointer select-none'>
              Yes
            </div>
            <div
              onClick={() => setConfirmModalIsOpen(false)}
              className='h-12 hover:bg-opacity-80 trans bg-slate-600 rounded-md text-white w-[40%] flex justify-center items-center font-bold cursor-pointer select-none'>
              No
            </div>
          </div>
        </div>
      </Modal>

      <InviteFromUnitModal isOpen={isInviteModalOpen} setIsOpen={setIsInviteModalOpen} />
      <div className='new-button' onClick={() => { setIsInviteModalOpen(true) }}
        title={"Invite Users"}
      >
        <FaPlus /> Invite
      </div>
      <div className='relative flex flex-col left-3 top-7'>
        {selected === 'resources' ? (<SideBarItem id={"resources"} text={"Resources"} icon={<FaFile />} link={`/unit/${unitId}`} selected={true} />) : (<SideBarItem id={"resources"} text={"Resources"} icon={<FaFile />} link={`/unit/${unitId}`} />)}
        {selected === 'members' ? (<SideBarItem id={"members"} text={"Members"} icon={<FaUser />} link={`/unit/members/${unitId}`} selected={true} />) : (<SideBarItem id={"members"} text={"members"} icon={<FaUser />} link={`/unit/members/${unitId}`} />)}
        {selected === 'settings' ? (<SideBarItem id={"settings"} text={"Settings"} icon={<FaCog />} link={`/unit/settings/${unitId}`} selected={true} />) : (<SideBarItem id={"settings"} text={"settings"} icon={<FaCog />} link={`/unit/settings/${unitId}`} />)}
      </div>

      {
        !isLoading && (
          !isOwner && (
            <div className='absolute w-[85%] bottom-2 h-12 flex left-4 justify-center items-center'>
              <div
                className='flex trans items-center select-none cursor-pointer justify-center w-full bg-red-600 hover:bg-red-700 hover:text-white rounded-md text-center font-bold text-slate-100 py-1'
                onClick={() => setConfirmModalIsOpen(true)}
              >
                <span>Leave Unit</span>
              </div>
            </div>
          )
        )
      }
    </div>
  )
}