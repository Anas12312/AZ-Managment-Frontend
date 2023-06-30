import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SideBarItem(props) {
    const nav = useNavigate();
  return (
    <div id={props.id} onClick={()=>{
        nav(props.link)
    }} className={props.selected?'side-bar-item side-bar-item-selected':'side-bar-item'}>
        <div className='fixed left-6'>{props.icon}</div>
        <div className='fixed left-12'>{props.text}</div>
    </div>
  )
}
