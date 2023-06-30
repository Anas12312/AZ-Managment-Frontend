import React from 'react'
import { FaFile, FaFolder } from 'react-icons/fa'
export default function Item(props) {
  return (
    <div className='item'>
        <div className='relative -left-4 font-normal flex items-center w-1/3'><FaFolder /> {props.name?<div className='relative left-4'>{props.name}</div>:"-"}</div>
        <div className='relative left-[4.5rem] font-light w-1/6'>{props.owner?props.owner:"-"}</div>
        <div className='relative left-[10rem] font-light w-1/6'>{props.lastModified?props.lastModified:"-"}</div>
        <div className='relative left-[14rem] font-light'>{props.size?props.size:"-"}</div>
    </div>
  )
}
