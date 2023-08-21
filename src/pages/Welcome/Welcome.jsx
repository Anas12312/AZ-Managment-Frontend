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
        <div className='flex justify-center items-center overflow-hidden '>
          <div className='top-0 left-0 absolute flex flex-col w-full h-full'>
            <div className='z-30 absolute top-9 right-64 flex justify-center items-center w-[4.5rem] h-11 text-white
                                hover:cursor-pointer hover:text-gray-300 hover:text-opacity-75 trans'>Sign In</div>
            <div className='z-30 absolute top-9 right-44 flex justify-center items-center w-[4.5rem] text-white
                            border h-11 border-white rounded-lg mx-1
                            hover:cursor-pointer hover:bg-white hover:bg-opacity-20 trans'>Sign Up</div>
            <div className='z-30 absolute top-9 left-44'>
              <img className='w-16' src="../../../images/logo2.png" alt="" />
            </div>
            <div className='z-30 absolute top-1/4 left-44 '>
              <div className='text-gray-200 text-6xl font-bold mb-5'>
                Manage Your Team.
              </div>
              <div className='text-gray-300 text-2xl'>
                AZ is the private and flexible team management <br></br>
                app that adapt your team's work flow.
              </div>
              <div className='text-white flex justify-center items-center 
                              text-2xl font-bold bg-sky-700
                              w-80 h-20 mt-6 rounded-lg hover:bg-sky-600
                              hover:cursor-pointer trans'>
                Get Started
              </div>
            </div>

          </div>
          <div className='absolute bottom-0 w-full h-20 bg-gray-600 
                          bg-opacity-40 flex justify-center text-white
                          items-center shadow-lg shadow-white'>
            <div className='absolute left-44 h-full flex flex-col justify-start items-start pt-2 w-full'>
              <div className='font-bold text-lg mt-2'>Follow Us</div>
              <div className='flex'>
                <div className='flex text-gray-300 text-sm mr-20'>
                  <div className='font-bold text-white mr-2'>Anazz</div>
                  <div className='z-30 mr-2 hover:cursor-pointer hover:text-white hover:underline'>GitHub</div>
                  <div className='z-30 mr-2 hover:cursor-pointer hover:text-white hover:underline'>LinkedIn</div>
                  <div className='z-30 mr-2 hover:cursor-pointer hover:text-white hover:underline'>Instagram</div>
                </div>
                <div className='flex text-gray-300 text-sm'>
                  <div className='font-bold text-white mr-2'>Zyad</div>
                  <div className='z-30 mr-2 hover:cursor-pointer hover:text-white hover:underline'>GitHub</div>
                  <div className='z-30 mr-2 hover:cursor-pointer hover:text-white hover:underline'>LinkedIn</div>
                  <div className='z-30 mr-2 hover:cursor-pointer hover:text-white hover:underline'>Instagram</div>
                </div>
                <div className='absolute top-1/3 right-[23rem] text-xl'>&copy; 2023 AZ</div>
              </div>
            </div>
            <div></div>
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
