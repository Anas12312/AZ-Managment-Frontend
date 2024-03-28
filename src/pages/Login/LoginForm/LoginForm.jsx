import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Button from '../../../components/Button';
import config from '../../../../config';
import { useNavigate, } from 'react-router-dom';
import Link from '../../../components/Link';
export default function LoginForm({ setError }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const nav = useNavigate();

    const login = () => {
        fetch(config.BASE_URL + "/account/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.error) {
                    console.log("error")
                    setError(response.error)
                } else {
                    setError("logged in")
                    nav('/home', {replace:true})
                    nav(0)
                    localStorage.setItem("token", response.token)
                    localStorage.setItem("user", JSON.stringify(response))

                    // setError("")
                    // nav('/home', { replace: true });
                }
            }).catch(err => {
                setError("error")
            })
    }
    return (
        <div className='flex flex-col justify-center items-center border w-80  mt-35 p-5 rounded-md bg-secondary-2 text-black'>

            <div className='w-full'>
                <div><span className='text-sm ml-1'>Email</span></div>
                <input className='text-sm w-full my-1 h-8 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3 ' type='text' name='email' value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        login()
                    }
                }}></input>
            </div>

            <div className='w-full my-3'>
                <div><span className='text-sm ml-1'>Password</span></div>
                <input className='text-sm w-full my-1 h-8 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3' type='password' name='password' value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        login()
                    }
                }}></input>
            </div>

            <div className='w-full'>
                <Button className="w-full h-9 rounded-md border text-sm bg-primary-2 text-white hover:bg-primary-1" title="Sign In" onClick={login} />
            </div>

        </div>
    )
}
