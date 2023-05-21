import React, { useEffect, useState } from 'react'
import SignupForm from './SignupForm/SignupForm'
import { useNavigate } from 'react-router-dom';

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
          <div>
            Logo
          </div>
          <SignupForm />
        </>
    ) } 
    </>
  )
}
