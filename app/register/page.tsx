"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Validators } from '../methods/validator';

const RegisterPage = () => {
    const router = useRouter();
    const {
        email,
        password,
        confirmPassword,
        handleChange,
      } = Validators();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            // loading state, error state, success state, debouncing the request
            const response = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if(data.ok) {
                router.push("/");
            } else {
                throw new Error(data.message || "Registration failed");
            }
            
        } catch (error) {
            console.log(error);
        }   
    }

  return (
    <div>
        <h1 className='text-2xl font-bold text-center p-4 bg-blue-500 text-white'>Hello Brother</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="email" placeholder='Email' value={email} 
                onChange={(e) => handleChange(e, "email")} />
            <input 
                type="password" placeholder='Password' value={password} 
                onChange={(e) => handleChange(e, "password")} />
            <input 
                type="password" placeholder='Confirm Password' 
                value={confirmPassword} onChange={(e) => handleChange(e, "confirmPassword")} />
            <button type='submit'>Register</button>
        </form>
        <div>
            <p>Already have an account? <Link href="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default RegisterPage