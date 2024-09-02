'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header'
import CursorAnimation from '@/components/Cursor';

const Page = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    image: '',
    author: '',
  });

  const [currUsername , setCurrUsername] = useState();

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    // Handle form submission here, e.g., send the `post` data to the server
    console.log(post);
  };

  const postPoem = async () => {
    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...post, author: currUsername }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      alert("Post added")
      // Reset form after successful post
      setPost({
        title: '',
        content: '',
        image: '',
        author: '',
      });
    } catch (error : any) {
      console.error('Failed to post', error.message);
    }
  }

  useEffect(() => {
    const me = async () => {
        const res = await fetch('/api/me');
        const result = await res.json();
        console.log(result.data.username);
        setCurrUsername(result.data.username);
    }

    me();
  })

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <CursorAnimation />
      <div  className='w-full'>
      <Header/>
      </div> 
      <div className='w-[70vw] h-full flex flex-col items-center justify-center gap-10'>
        <h1 className='font-Amsterdam text-4xl'>POST</h1>
        <form
        
          className='flex flex-col gap-10 p-5 items-center justify-center'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col font-Amsterdam'>
            T i t l e
          <input
            name='title'
            className='bg-zinc-100 rounded-md p-4 outline-none w-[60vw]'
            placeholder='title . . .'
            type='text'
            value={post.title}
            onChange={handleChange}
          />
          </div>
          
          <div className='flex flex-col font-Amsterdam'>
            S T O R Y
            <textarea
            name='content'
            className='bg-zinc-100 p-2 text-black outline-none w-[60vw]'
            rows={20}
            placeholder='Type your story . . . '
            value={post.content}
            onChange={handleChange}
          />
          </div>
         
          <input
            name='author'
            placeholder='author'
            className='p-2 bg-zinc-100 rounded-md w-[60vw] outline-none font-semibold font-teko'
            type='text'
            value={currUsername}
          />
          <button onClick={postPoem} className='font-Amsterdam px-3 py-1 bg-zinc-100 w-[10vw]' type='submit'>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
