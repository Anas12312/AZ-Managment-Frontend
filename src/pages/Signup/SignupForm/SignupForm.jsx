import React, { useState } from 'react'

export default function SignupForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = (e) => {
        console.log(email);
    }

  return (
    <>
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
            <button onClick={signup} >Sign Up</button>
        </div>
    </>
  )
}