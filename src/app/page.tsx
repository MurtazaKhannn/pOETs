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

const header = () => {
  // const elementRef = useRef(null);

  // const handleRef = () => {
  //   gsap.to(elementRef.current, {
  //     // duration: 1,
  //     // x: 100,

  //     // rotation: 360,
  //     backgroundColor: "red",
  //     duration: 0.8,
  //     ease: "power2.out",
  //   }); 
  // };

  const router = useRouter();


  useEffect(() => {
    gsap.fromTo(
      ".thoughtOne", // Class name to target
      { opacity: 0, overflowY: "hidden", y: -150, borderRadius: "0px" }, // Initial state
      {
        opacity: 1,
        y: 0,
        overflowY: "hidden",
        borderRadius: "80px",
        duration: 5,
        ease: "power4.out",
      } // Final state
    );

    gsap.fromTo(
      ".thoughtOneP", // Class name to target
      { opacity: 0, y: -100 }, // Initial state
      { opacity: 1, y: 0, duration: 5, ease: "power4.out" } // Final state
    );

    gsap.fromTo(
      ".thoughtTwoP", // Class name to target
      { opacity: 0 }, // Initial state
      { opacity: 1, duration: 5, delay: 3, ease: "power4.out" } // Final state
    );

    gsap.fromTo(
      ".thouughtC", // Class name to target
      { opacity: 0 }, // Initial state
      { opacity: 1, duration: 3, delay: 3, ease: "power4.out" } // Final state
    );

    gsap.fromTo(
      ".picThree", // Class name to target
      { opacity: 0, y: 100 }, // Initial state
      { opacity: 1, duration: 5, y: 10, ease: "power4.out" } // Final state
    );

    gsap.fromTo(
      ".thoughThree", // Class name to target
      { opacity: 0, y: 0 }, // Initial state
      { opacity: 1, duration: 5, y: -200, ease: "power4.out" } // Final state
    );

    gsap.fromTo(
      ".mobilePic",
      { opacity: 0, x: -100 }, // Initial state
      { opacity: 1, duration: 2, x: 0, ease: "power4.out" }
    );

    gsap.fromTo(
      ".username",
      { opacity: 0, rotate: 3 }, // Initial state
      {
        opacity: 1,
        duration: 2,
        rotate: -4,
        repeat: -1, // Infinite repeat
        repeatDelay: 0, // Delay between repeats
        yoyo: true,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      ".create",
      {rotate: 0 , scale:1 }, // Initial state
      {
        opacity: 1,
        scale: 1.06,
        duration: 2,
        rotate: -8,
        repeat: -1, // Infinite repeat
        repeatDelay: 0, // Delay between repeats
        yoyo: true,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      ".thoughtTwo", // Class name to target
      {
        opacity: 0,
        padding: "8px",
        overflowY: "hidden",
        y: 112,
        borderRadius: "0px",
      },
      {
        opacity: 1,
        y: 0,
        borderRadius: "100px",
        overflowY: "hidden",
        padding: "8px",
        duration: 5,
        ease: "power4.out",
      }
    );

  }, []);

  return (
    <>

      {/* <Header /> */}
      <div className="w-full h-full lg:flex lg:flex-col mt-5 ">
        
        <div onClick={() => {router.push("/login")}} className="w-full cursor-pointer flex items-center justify-center font-tint text-[4vw] h-[10vh]">Login First Dude</div>
        
      </div>
    </>
  );
};

export default header;
