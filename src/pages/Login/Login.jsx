import React, { useEffect, useLayoutEffect, useState } from 'react'
import LoginForm from './LoginForm/LoginForm'
import { useNavigate, } from 'react-router-dom'
import Link from '../../components/Link'

export default function Login() {
  const [isAuth, setIsAuth] = useState(true)
  const nav = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem("token")) {
        setIsAuth(true)
        nav("/home", { replace: true })
    }else {
      setIsAuth(false)
    }
  }, [])
  return (
    <>
       {!isAuth && (
        <div>
          <LoginForm />
          Don't Have an Account? <Link text="Signup" onClick={()=>nav("/signup")}/>
        </div>
       )}
    </>
  )
}
