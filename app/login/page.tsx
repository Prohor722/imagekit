"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { Validators } from '../methods/validator';

const LoginPage = () => {
    const {
        email,
        password,
        handleChange,
      } = Validators();
    const router = useRouter();


  return (
    <div>Login</div>
  )
}

export default LoginPage