import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SideBarItem(props) {
    const nav = useNavigate();
  return (
    <div onClick={()=>{
        nav(props.link)
    }} className='side-bar-item'>
        <span className='fixed left-9'>{props.icon}</span>
        <span className='fixed left-16'>{props.text}</span>
    </div>
  )
}
