import React, { useEffect, useState } from 'react'
import color from '../../Styles/color'
export default function NotFound() {
  const [a, setA] = useState()
  const [b, setB] = useState()
  
  return (
    <div className={"w-screen " + b}>
      <input className='border-2' type='text' onChange={(e)=>{
        setA(color.text(e.target.value))
      }}/>
      <input className='border-2' type='text' onChange={(e)=>{
        setB(color.bg(e.target.value))
      }}/>
      <p className={a}>Anazz and ZoZ</p>
    </div>
  )
}
