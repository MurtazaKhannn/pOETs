"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CursorAnimation from "@/components/Cursor";

const Page = () => {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST', // Ensure the method is correct
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
  
      // Check if the response is OK
      if (!response.ok) {
        // Extract the error message from the response
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }
  
      // Parse the JSON response
      const data = await response.json();
      console.log("Success", data);
  
      // Use the message from the response for the success alert
      setAlertMessage(data.message || "Login successful!");
      setAlertSeverity('success');
      setOpen(true);
  
      // Redirect to the header page
      router.push('/header');
        
    } catch (error : any) {
      console.error(`Error in login: ${error}`);
      setAlertMessage(error.message || 'Login failed!');
      setAlertSeverity('error');
      setOpen(true);
    }
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  const router = useRouter();

  return (
    
    <div className="w-full h-screen font-Amsterdam">
      <CursorAnimation />
      <div className="flex items-center justify-center font-teko text-5xl font-bold">
        b<p className="text-yellow-600 mt-[6px] font-bold">LOG</p>{" "}
        <p className="mt-3 lowercase">s</p>
      </div>

      <div className="flex w-full h-[91.5vh] flex-col items-center justify-center">
        <h1 className="text-6xl">Login</h1>
        <form className="flex flex-col items-center gap-5" onSubmit={handleLogin}>
          <div className="flex flex-col gap-5 mt-10 ">
            <input
              className="bg-zinc-100 text-2xl rounded-md p-1 font-teko font-semibold"
              type="text"
              placeholder="Username"
              name="username"
              value={input.username}
              onChange={handleChange}
            />
            <input
              className="bg-zinc-100 rounded-md p-1 font-teko text-2xl font-semibold"
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
          </div>

          <div className="font-teko flex flex-col gap-1">
            <div className="flex items-center justify-center gap-2 text-xl">
              New User?{' '}
              <p
                onClick={() => router.push("/signup")}
                className="cursor-pointer"
              >
                SignUp
              </p>
            </div>

            <button
              className="bg-zinc-100 w-60 flex items-center justify-center rounded-md py-1 hover:bg-zinc-200 text-lg font-semibold"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      
    </div>
  );
};

export default Page;
