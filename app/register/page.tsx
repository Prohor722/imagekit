"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const mailValidator = (email:string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const passwordValidator = (password:string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>,type:string) => {
        if(type === "email") {
            if(!mailValidator(e.target.value)) {
                alert("Invalid email");
                return;
            }
            setEmail(e.target.value);
        } else if(type === "password") {
            if(!passwordValidator(e.target.value)) {
                alert("Invalid password");
                return;
            }
            setPassword(e.target.value);
        } else if(type === "confirmPassword") {
            if(e.target.value !== password) {
                alert("Passwords do not match");
                return;
            }
            setConfirmPassword(e.target.value);
        }
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
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
    </div>
  )
}

export default RegisterPage