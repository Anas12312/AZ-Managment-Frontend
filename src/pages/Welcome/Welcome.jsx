import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

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

  const onClickSignUp = () => {
    nav('signup')
  }

  const onClickLogIn = () => {
    nav('login')
  }

  return (
    <>
      {render?(
        <div>
          <p className=' text-xl' >Welcome</p>
          <p className=' text-sm'>This is AZ</p>
          <Button 
            style='default'
            title='Sign Up'
            onClick={onClickSignUp}
          />
          <Button 
            style='default'
            title='Log In'
            onClick={onClickLogIn}
          />
        </div>
      ):(<></>)}
    </>
  )
}
