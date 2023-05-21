import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import config from '../../../config'

export default function Home() {
  const [isAuth, setIsAuth] = useState(false)
  const nav = useNavigate()
  const logout = () => {
    const url = config.BASE_URL + "/account/logout"
    fetch(url, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then((response) => {
      if(response.status === 200) {
        localStorage.removeItem("token")
        nav("/login")
      }else {
        alert("An Error Has Occured!")
      }
    })
  }
  useEffect(()=>{
    if(localStorage.getItem("token")) {
      setIsAuth(true)
    }else {
      setIsAuth(false)
      nav("/login")
    }
    console.log(isAuth)
  },[])
  return (
    <>
      {isAuth && (
        <div>
          <Button title="Logout" onClick={logout} />
        </div>
      )}
    </>
  )
}
