import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { FaArrowDown, FaArrowLeft, FaDownload, FaEllipsisV, FaImage, FaMinus, FaMinusCircle, FaOptinMonster, FaPlus, FaPlusCircle } from 'react-icons/fa'
export default function ViewImage({isOpen, setIsOpen, imgUrl, name}) {
  const [imageStyle, setImageStyle] = useState("w-[50rem] max-h-[36rem] object-contain");
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState(null)
  const [move, setMove] = useState(null)
  useEffect(()=>{
    switch(scale) {
      case 1:
        setImageStyle(`w-[50rem] max-h-[36rem] object-contain scale-[1] transition-all transition`)
        break
      case 2:
        setImageStyle(`w-[50rem] max-h-[36rem] object-contain scale-[1.4] transition-all transition`)
        break
      case 3:
        setImageStyle(`w-[50rem] max-h-[36rem] object-contain scale-[1.8] transition-all transition`)
        break
      case 4:
        setImageStyle(`w-[50rem] max-h-[36rem] object-contain scale-[2.2] transition-all transition`)
        break
      case 5:
        setImageStyle(`w-[50rem] max-h-[36rem] object-contain scale-[2.6] transition-all transition`)
        break
      case 6:
        setImageStyle(`w-[50rem] max-h-[36rem] object-contain scale-[3] transition-all transition`)
        break
      case 7:
        setImageStyle(`w-[50rem] max-h-[36rem] object-contain scale-[3.4] transition-all transition`)
        break
      case 8:
        setImageStyle(`w-[50rem] max-h-[36rem] object-contain scale-[3.8] transition-all transition`)
        break
      case 9:
        setImageStyle(`w-[50rem] max-h-[36rem] object-contain scale-[4.2] transition-all transition`)
        break
      case 10:
        setImageStyle(`image w-[50rem] max-h-[36rem] object-contain scale-[4.6] transition-all transition`)
        break   
    }
  },[scale])
  const closeViewImage = () => {
    setScale(1)
    setIsOpen(false);
  }
  const zoomOut = ()=>{
    if(scale <= 1) {
    }else {
      setScale(scale-1)
    }
  }
  const zoomIn = ()=>{
    if(scale >= 10) {
    }else {
      setScale(scale+1)
    }

  }
  const image = document.getElementById("img")
  useEffect(()=> {
    if(move) {
      image.style.objectPosition = `${move.x*-100}px ${move.y*-100}px`
    }
  },[move])
  const trackMouse = (e) => {
    e = e || window.event;
    setMove({
      x: position.x - e.clientX,
      y: position.y - e.clientY
    })
    setPosition({
      x: e.clientX,
      y: e.clientY
    })

  }
  const startDrag = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY
    })
  }

  return (
    <div>
      <Modal
        appElement={document.getElementById('root')}
        isOpen={isOpen}
        className={'select-none -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-full w-full absolute flex justify-between items-center rounded-md text-black'}
        shouldFocusAfterRender={false}
        onRequestClose={closeViewImage}
      >
        <div className='bg-black w-full h-full bg-opacity-70 ' onClick={()=>{
          closeViewImage()
        }}>
          <div className='relative top-[3.56rem] w-full h-14 z-10 bg-transparent flex justify-between items-center text-white hover:bg-black hover:bg-opacity-20' onClick={(e) => {e.stopPropagation()}}>
            <div className='flex justify-around items-center w-1/6 ml-5'>
              <div className='flex justify-center items-center text-lg rounded-full p-[0.4rem] hover:bg-white hover:bg-opacity-20 hover:cursor-pointer'
                   onClick={(e)=>{closeViewImage()}}><FaArrowLeft size={25} /></div>
              <div className='flex justify-center items-center text-lg ml-5 mr-2'><FaImage size={25} /></div>
              <div className='flex justify-center items-center text-lg font-bold'>{name}</div>
            </div>
            <div className='flex justify-around items-center w-[8%] mr-4'>
              <div className='flex justify-center items-center text-lg rounded-full p-[0.5rem] hover:bg-white hover:bg-opacity-20 hover:cursor-pointer'><a href={imgUrl} download><FaDownload size={20} /></a></div>
              <div className='flex justify-center items-center text-lg rounded-full p-[0.5rem] hover:bg-white hover:bg-opacity-20 hover:cursor-pointer'><FaEllipsisV size={20} /></div>
            </div>
          </div>
          <div onClick={(e) => {e.stopPropagation()}} className='p-3   absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2  flex justify-between items-center  rounded-md'>
            <img id='img' className={imageStyle} src={imgUrl} alt=""  onDragStart={startDrag} onDragOver={trackMouse} />
          </div>
          <div onClick={(e)=>{e.stopPropagation()}} className='px-2 py-1 border border-white flex justify-between items-center w-60 absolute left-1/2 top-[90%] -translate-x-1/2 bg-black rounded-3xl bg-opacity-40 hover:bg-opacity-95'>
            <div className='w-12 h-12 flex justify-center items-center
                           text-white hover:cursor-pointer rounded-full
                           hover:bg-white hover:bg-opacity-40'
                onClick={(e)=>{
                  zoomOut()
                  e.stopPropagation()
                }}><FaMinus size={25} /></div>
            <div className='w-12 h-12 flex justify-center items-center
                           text-white hover:cursor-pointer rounded-full
                           hover:bg-white hover:bg-opacity-40'
                onClick={(e)=>{
                zoomIn()
                e.stopPropagation()
              }}><FaPlus size={25} /></div>
          </div>
        </div>

      </Modal>
    </div>
  )
}
