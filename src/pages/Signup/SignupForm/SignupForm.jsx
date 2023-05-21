import React, { useState } from 'react'
import Button from '../../../components/Button'
import config from '../../../../config'
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const nav = useNavigate();

    const signup = () => {
        fetch(`${config.BASE_URL}/account/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: username,
                email,
                password
            })
        }).then(res => res.json())
        .then(respone => {
            if(respone.error) {
                setError(respone.error);
            }
            else {
                localStorage.setItem('token', respone.token);
                nav('/home', { replace: true });
            }
        })
    }

  return (
    <>
        <p>{error}</p>

        <p>Username</p>
        <input type='text' name='username' value={username} onChange={(e) => {
            setUsername(e.target.value);
        }} />

        <p>Email</p>
        <input type='text' name='email' value={email} onChange={(e) => {
            setEmail(e.target.value);
        }}/>

        <p>Passowrd</p>
        <input type='password' name='password' value={password} onChange={(e) => {
            setPassword(e.target.value);
        }}/>

        <div>
            <Button title='SignUp' onClick={signup} />
        </div>
    </>
  )
}