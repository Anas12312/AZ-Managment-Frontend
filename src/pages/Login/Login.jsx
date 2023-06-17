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
        <div className='flex flex-col justify-start pt-10 items-center h-screen w-screen bg-gradient-to-br via-primary-2 background-animate-1 from-background to-accent text-text'>
          <div className='mb-5 text-xl flex flex-col justify-center items-center'>
            <img src="../../../images/logo2.png" alt="" className='w-20 mb-6'/>
            <span>Sign in to AZ</span>
          </div>
          {/* <div className='error'>
            <h4>wrong password</h4>
          </div> */}
          
          <LoginForm />
          <div className='flex mt-4 border w-80 h-16 justify-center items-center rounded-md bg-opacity-5 bg-white'>
            <span className='text-sm'>Don't Have an Account? <Link text="Signup" onClick={()=>nav("/signup")}/></span>
          </div>
        </div>
       )}
    </>
  )
}
