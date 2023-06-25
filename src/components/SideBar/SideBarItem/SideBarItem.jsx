import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SideBarItem(props) {
    const nav = useNavigate();
  return (
    <div onClick={()=>{
        nav(props.link)
    }} className='side-bar-item'>
        <div className='fixed left-9'>{props.icon}</div>
        <div className='fixed left-16'>{props.text}</div>
    </div>
  )
}
