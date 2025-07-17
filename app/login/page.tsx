"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { Validators } from '../methods/validator';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
    const {
        email,
        password,
        handleChange,
      } = Validators();
    const router = useRouter();
    
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signIn("credentials",{
            email,
            password,
            redirect: false,
        })

        if(result?.error) {
            alert("Invalid credentials");
        } else {
            router.push("/");
        }
        
    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Email' value={email} onChange={(e) => handleChange(e, "email")} />
            <input type="password" placeholder='Password' value={password} onChange={(e) => handleChange(e, "password")} />
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default LoginPage