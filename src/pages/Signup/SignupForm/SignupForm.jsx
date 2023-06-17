import React, { useState } from 'react'
import Button from '../../../components/Button'
import config from '../../../../config'
import { useNavigate } from 'react-router-dom';

export default function SignupForm(props) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                props.setError(respone.error);
            }
            else {
                localStorage.setItem('token', respone.token);
                nav('/home', { replace: true });
            }
        })
        .catch(err => {
            props.setError('error ')
        })
    }

  return (
    <div className='flex flex-col justify-center items-center border w-80  mt-35 p-5 rounded-md bg-secondary-2 text-black'>

        <div className='w-full mb-3'>
            <div><span className='text-sm ml-1'>Username</span></div>
            <input className='text-sm w-full my-1 h-8 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3' type='text' name='username' value={username} onChange={(e) => {
                setUsername(e.target.value);
            }} />
        </div>

        <div className='w-full mb-3'>
            <div><span className='text-sm ml-1'>Email</span></div>
            <input className='text-sm w-full my-1 h-8 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3' type='text' name='email' value={email} onChange={(e) => {
                setEmail(e.target.value);
            }}/>
        </div>

        <div className='w-full mb-3'>
            <div><span className='text-sm ml-1'>Passowrd</span></div>
            <input className='text-sm w-full my-1 h-8 py-1 px-2 border border-primary-1 rounded-md bg-secondary-3' type='password' name='password' value={password} onChange={(e) => {
                setPassword(e.target.value);
            }}/>
        </div>

        <div className='w-full'>
            <Button className="w-full h-9 rounded-md border text-sm bg-primary-2 text-white hover:bg-primary-1" title="Sign Up" onClick = {signup} />
        </div>

    </div>
  )
}