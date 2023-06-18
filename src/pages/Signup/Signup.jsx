import React, { useEffect, useState } from 'react'
import SignupForm from './SignupForm/SignupForm'
import { useNavigate } from 'react-router-dom';
import Link from '../../components/Link';

export default function Signup() {

  const [isAuth, setIsAuth] = useState(true);
  const [error, setError] = useState("")
  const nav = useNavigate();

  useEffect(() => {
    if( !localStorage.getItem('token') ) {
      setIsAuth(localStorage.getItem('token'));
    } else
    {
      setIsAuth(localStorage.getItem('token'));
      nav('/home', {replace: true});
    }
  }, [])

  return (
    <>
      { !isAuth && (
        <div className="flex flex-col justify-start pt-10 items-center h-screen w-screen bg-gradient-to-br via-primary-2 background-animate-1 from-background to-accent text-text">
        
        <div className='mb-5 text-xl flex flex-col justify-center items-center'>
          <img src="../../../images/logo2.png" alt="" className='w-20 mb-6'/>
          <span>Sign up to AZ</span>
        </div>

        {
          error && 
          <div className='relative flex mt-4 border border-red-700 w-80 h-16 justify-center items-center rounded-md bg-opacity-25 bg-red-500 my-5'>
            <span>{error}</span>
            <span className='hover:cursor-pointer absolute right-5 font-semibold' 
            onClick={() => {
              setError("")
            }}
            >X</span>
          </div>
        }

        <SignupForm setError={setError}/>

        <div className='flex mt-4 border w-80 h-16 justify-center items-center rounded-md bg-opacity-5 bg-white'>
            <span className='text-sm'>Already Have an Account?  <Link text="Login" onClick={()=>nav("/login")}/></span>
        </div>

        </div>
    ) } 
    </>
  )
}
