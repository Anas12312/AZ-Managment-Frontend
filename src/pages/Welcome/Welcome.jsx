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
    <div className='anas'>
      {render?(
        <div className='flex justify-center items-center overflow-hidden '>
          <div className='top-0 left-0 absolute flex flex-col w-full h-full'>
            <div className='z-30 absolute top-9 right-64 flex justify-center items-center w-[4.5rem] h-11 text-white
                                hover:cursor-pointer hover:text-gray-300 hover:text-opacity-75 trans'
                                onClick={() => {
                                  nav('/login')
                                }}>Sign In</div>
            <div className='z-30 absolute top-9 right-44 flex justify-center items-center w-[4.5rem] text-white
                            border h-11 border-white rounded-lg mx-1
                            hover:cursor-pointer hover:bg-white hover:bg-opacity-20 trans'
                            onClick={() => {
                              nav('/signup')
                            }}>Sign Up</div>
            <div className='z-30 absolute top-9 left-44 hover:cursor-pointer'
                onClick={()=>{nav(0)}}>
              <img className='w-14' src="../../../images/logo2.png" alt="" />
            </div>
            <div className='z-30 absolute top-1/4 left-44 '>
              <div className='text-gray-200 text-[3.2rem] font-bold mb-5'>
                Manage Your Team.
              </div>
              <div className='text-gray-300 text-xl'>
                AZ is the private and flexible team management <br></br>
                app that adapt your team's work flow.
              </div>
              <div className='text-white flex justify-center items-center 
                              text-2xl font-bold bg-sky-700
                              w-80 h-20 mt-6 rounded-lg hover:bg-sky-600
                              hover:cursor-pointer trans'
                    onClick={() => {
                      nav('/signup')
                    }}>
                Get Started
              </div>
              <div className='mt-4 text-white hover:cursor-pointer hover:underline'
                onClick={() => {
                  nav('/login')
                }}>
                Already have an account? Sign In now.
              </div>
            </div>

          </div>
          <div className='absolute bottom-0 w-full h-20 bg-gray-600 
                          bg-opacity-40 flex justify-center text-white
                          items-center shadow-lg shadow-white'>
            <div className='absolute left-44 h-full flex flex-col justify-start items-start pt-2 w-full'>
              <div className='font-bold text-base mt-2'>Follow Us</div>
              <div className='flex'>
                <div className='flex text-gray-300 text-xs mr-20'>
                  <div className='font-bold text-white mr-2'>Anazz</div>
                  <div className='z-30 mr-2 hover:cursor-pointer hover:text-white hover:underline' onClick={()=>{window.open('https://github.com/Anas12312')}}>GitHub</div>
                  <div className='z-30 mr-2 hover:cursor-pointer hover:text-white hover:underline' onClick={()=>{window.open('https://www.linkedin.com/in/anas-hesham-87871a19a/')}}>LinkedIn</div>
                  <div className='z-30 mr-2 hover:cursor-pointer hover:text-white hover:underline' onClick={()=>{window.open('https://www.facebook.com/anas.hesham1')}}>Facebook</div>
                </div>
                <div className='flex text-gray-300 text-xs'>
                  <div className='font-bold text-white mr-2'>Zyad</div>
                  <div className='z-30 mr-2 hover:cursor-pointer hover:text-white hover:underline' onClick={()=>{window.open('https://github.com/zyad007')}}>GitHub</div>
                  <div className='z-30 mr-2 hover:cursor-pointer hover:text-white hover:underline' onClick={()=>{window.open('https://www.linkedin.com/in/zyad-abdul-nasser-4977651b8/')}}>LinkedIn</div>
                  <div className='z-30 mr-2 hover:cursor-pointer hover:text-white hover:underline' onClick={()=>{window.open('https://www.facebook.com/profile.php?id=100095030204990')}}>Facebook</div>
                </div>
                <div className='absolute top-1/3 right-[23rem] text-lg'>&copy; 2023 AZ</div>
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
      ):(<div></div>)}
    </div>
  )
}
