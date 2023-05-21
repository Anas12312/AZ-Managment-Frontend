import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const nav = useNavigate()
  const [render, setRender] = useState(false)
  useEffect(()=>{
    if(localStorage.getItem("token")) {
      setRender(false)
        nav("/home", { replace: true })
    }else {
      setRender(true)
    }
}, [])
  return (
    <>
      {render?(<div>Welcome</div>):(<></>)}
    </>
  )
}
