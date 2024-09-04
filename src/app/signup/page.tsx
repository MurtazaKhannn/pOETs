'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import { Alert, Snackbar } from '@mui/material';
import CursorAnimation from '@/components/Cursor';

const Page = () => {

  const [input , setInput] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const router = useRouter(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name , value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
  
      if (response.ok) {
        toast.success('Signup successful! Redirecting to login...');
        router.push('/login');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed. Please try again.');
      }

      const data = await response.json();
      console.log("Success", data);

      setAlertMessage(data.message || "Login successful!");
      setAlertSeverity('success');
      setOpen(true);

    } catch (error: any) {
      console.error(`Error in signup: ${error.message}`);
      console.log('This should log before the alert');
      setAlertMessage(error.message || 'Login failed!');
      setAlertSeverity('error');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <CursorAnimation />
      <div className="flex items-center font-teko justify-center text-5xl font-bold">
        p<p className="text-yellow-600 mt-[6px] font-bold">OET</p>{" "}
        <p className="mt-3 lowercase">s</p>
      </div>
      
      <div className='flex w-full h-full flex-col items-center justify-center gap-5'>
        <h1 className='font-Amsterdam text-6xl'>SignUp</h1>
        <div className='flex flex-col items-center justify-center'>
          <form  className='flex flex-col gap-5 items-center justify-center' action="">  
            <div className='flex flex-col justify-center items-center gap-5 font-teko '>
              <input className='text-2xl bg-zinc-100 p-1 rounded-md  w-[16vw] font-bold' name='username' value={input.username} onChange={handleChange} placeholder='username' type="text" />
              <input className='text-2xl bg-zinc-100 p-1 rounded-md  w-[16vw] font-bold' name='email' value={input.email} onChange={handleChange} placeholder='email' type="text" />
              <input className='text-2xl p-1 rounded-md bg-zinc-100 w-[16vw] font-bold' name='password' value={input.password} onChange={handleChange} type="password" placeholder='password' />
            </div>
            <div className='font-teko text-xl flex gap-2'>
              already have an account ? <p className='cursor-pointer' onClick={() => {router.push("/login")}}>Login</p>
            </div>
            <button type='submit' onClick={handleSignUp} className='font-Amsterdam bg-zinc-100 w-full flex rounded-md hover:bg-zinc-200 items-center justify-center'>
              SignUp
            </button>
          </form>
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      

    </div>
  )
}

export default Page;
