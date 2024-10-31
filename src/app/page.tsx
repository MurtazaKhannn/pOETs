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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@mui/material";
import PicturesH from "@/Assets/PicturesH";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";

const Page = () => {


  const router = useRouter();

  return (
    <>

      <Header />
      <div className="w-full h-screen fixed">
        
        {/* <div onClick={() => {router.push("/login")}} className="w-full cursor-pointer flex items-center justify-center font-tint text-[4vw] h-[10vh]">Login First Dude</div> */}
        <div className="flex justify-center gap-20 ">

        <motion.div style={{
        lineHeight: "1.5rem", 
        transition: "line-height 0.3s ease",
      }} whileHover={{lineHeight:"3.8rem" , transition: { duration: 1, ease: "easeInOut" },}} className="xl:flex flex-col w-1/3 h-[89.4vh] xl:items-center hidden xl:justify-center text-[5vw] font-pacifico uppercase">
          Poetry is the art of expressing the <i className="text-red-700">inexpressible</i>  it is where creativity finds its voice.
        </motion.div>


        <div id="page1" className="w-1/3 relative flex h-[89.4vh] items-center justify-center">
          <div className="flex items-center justify-center">
            <Carousel className="w-full max-w-xs flex items-center justify-center">
              <CarouselContent>
                {PicturesH.map((pic , index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex flex-col gap-4 aspect-square items-center justify-center p-4">
                          <CardTitle className="text-xl font-teko">{pic.title}</CardTitle>
                          <Image src={pic?.image} alt="Home iMAGE" className="text-4xl font-semibold object-cover rounded-md"/>
                          <CardDescription className="text-md font-teko">{pic.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Page;
