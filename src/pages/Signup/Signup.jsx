import React, { useEffect, useState } from 'react'
import SignupForm from './SignupForm/SignupForm'
import { useNavigate } from 'react-router-dom';
import Link from '../../components/Link';

export default function Signup() {

  const [isAuth, setIsAuth] = useState(true);

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
        <>
          <button className='
          hover:background-animate-1
          text-white transition-all duration-300 ease-in-out delay-150 bg-gradient-to-r from-blue-600 to-violet-800 rounded-lg text-sm px-20 py-2.5 text-center m-2'> Test 1</button>
          <div className='
              bg-slate-950
              p-5
          '>
            <div className='
              bg-black
              box-border h-32 w-32
              m-10
              bg-gradient-to-l
              from-blue-700 from-20 
              to-blue-500 to-10 
              background-animate-2
              rounded-full
              shadow-lg shadow-black-600
              inline-block
            '>
            </div>
            <div className='
              bg-black
              box-border h-32 w-32
              m-10
              bg-gradient-to-tl
              from-blue-500 from-20
              via-red-700 via-70
              to-slate-500 to-10
              background-animate-1
              rounded-full
              shadow-lg shadow-black-600
              inline-block
            '>
            </div>
            <div className='
              bg-black
              box-border h-32 w-32
              m-10
              bg-gradient-to-tl
              from-green-500 from-20
              via-slate-500 via-70
              to-blue-700 to-10
              background-animate-1
              rounded-full
              shadow-lg shadow-black-600
              inline-block
            '>
            </div>
            <div className='
              bg-black
              box-border h-32 w-32
              m-10
              bg-gradient-to-tl
              from-red-500 
              via-blue-600
              to-violet-500 
              background-animate-1
              rounded-full
              shadow-lg shadow-black-600
              inline-block
            '>
            </div>
          </div>
          <div className='
              bg-slate-900
              p-5
          '>
            <div className='
              bg-black
              box-border h-16 w-62
              m-10
              bg-gradient-to-r
              from-blue-500 from-20
              via-green-700 via-70
              to-slate-500 to-10
              background-animate
              rounded-md
              shadow-md shadow-slate-700
            '></div>
          </div>

          <div className="text-amber-400">
            Logo
          </div>
          <SignupForm />
          Already Have an Account? <Link text="Login" onClick={()=>nav("/login")}/>
        </>
    ) } 
    </>
  )
}
