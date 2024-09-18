"use client";

import React, { createContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import profilepic from "@/Assets/blog_pic_11.png";
import model from "@/Assets/kareya.jpg";
import velizer from "@/Assets/velizar.jpg";
import mobilepic from "@/Assets/mobilepic.jpg";
import candle from "@/Assets/candle.jpg";
import blogPic10 from "@/Assets/blog_pic_10.png";
import { CiLogout } from "react-icons/ci";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import gsap from "gsap";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Page = () => {


  const router = useRouter();

  return (
    <>

      <Header />
      <div className="w-full h-screen fixed bg-black">
        
        <div onClick={() => {router.push("/login")}} className="w-full cursor-pointer flex items-center justify-center font-tint text-[4vw] h-[10vh]">Login First Dude</div>
      </div>
    </>
  );
};

export default Page;
