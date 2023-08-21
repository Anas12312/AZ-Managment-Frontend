import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

export default function Welcome() {
  const nav = useNavigate()
  const [render, setRender] = useState(false)
  useEffect(()=>{
    if(localStorage.getItem("token")) {
      console.log(localStorage.getItem('token'));
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
        <div className='flex justify-center items-center overflow-hidden'>
          <div className='top-0 left-0 absolute flex flex-col w-full h-full'>
            <div className='z-30 absolute top-4 right-32 flex justify-center items-center w-[4.5rem] h-11 text-white
                                hover:cursor-pointer hover:text-black hover:text-opacity-75 trans'>Sign In</div>
            <div className='z-30 absolute top-4 right-10 flex justify-center items-center w-[4.5rem] text-white
                            border h-11 border-white rounded-lg mx-1
                            hover:cursor-pointer hover:bg-white hover:bg-opacity-20  trans'>Sign Up</div>
            <div className=''>
              <img src="../../../images/logo2.png" alt="" />
            </div>
          </div>
          <div className='z-20 absolute -top-10 flex w-[120%] h-28 bg-black opacity-70 blur-2xl'></div>
          <div class="stars">
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
          </div>
        </div>
      ):(<></>)}
    </>
  )
}
