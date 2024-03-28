import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import config from '../../../config'
import ProfileData from './ProfileData/ProfileData'

export default function ViewProfile() {
    const params = useParams()
    const nav = useNavigate()
    const [authorized, setAuthorized] = useState(true)
    const [userData, setUserData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user')).user
        if(!params.username) {
            setAuthorized(true)
            nav('/profile/' + user.username)
            nav(0)
            loadProfile(user.username)
        }
        params.username&&loadProfile(params.username)
        if(user.username === params.username) {
            setAuthorized(true)
        }else {
            setAuthorized(false)
        }
    },[])
    const loadProfile = (username) => {
        setIsLoading(true)
        fetch(config.BASE_URL + '/users/' + username)
        .then((res) => {
            if(res.status === 404) {
                console.log("first")
                nav('/notfound')
                return
            }else {
                return res.json()
            }
        })
        .then((response) => {
            setUserData(response)
            setIsLoading(false)
        }).catch(() => {
            console.log("second")
            nav('/notfound')
        }) 
    }
  return (
    <div >
        {!isLoading?(
            <div className='flex flex-col h-full'>
                <ProfileData isAuthorized={authorized} data={userData} />
            </div>
        ):(
            <div></div>
        )}
    </div>
  )
}
