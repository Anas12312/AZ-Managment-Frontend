import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button';
import config from '../../../../config';
export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const login = () => {
        fetch(config.BASE_URL + "/account/login", {
            method: "POST",
            headers:  { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then((res) => res.json())
        .then((response) => {
            console.log(response)
        })
    }
  return (
    <>
        <div className='error'>
            <h4>{error}</h4>
        </div>
        <div className='email'>
            <input type='text' name='email' value={email} onChange={(e) => {
                setEmail(e.target.value)
            }}></input>
        </div>
        <div className='password'>
            <input type='password' name='password' value={password} onChange={(e) => {
                setPassword(e.target.value)
            }}></input>
        </div>
        <div className='login'>
            <Button title="Login" onClick = {login} />
        </div>
    </>
  )
}
