"use client";

import React, { createContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import profilepic from "@/Assets/blog_pic_11.png";
import model from "@/Assets/kareya.jpg";
import velizer from "@/Assets/velizar.jpg";
import mobilepic from "@/Assets/mobilepic.jpg";
import candle from "@/Assets/candle.jpg";
import blogPic10 from "@/Assets/blog_pic_10.png";
import typewriter from "@/Assets/tyoewriter.jpg";
import redrose from "@/Assets/redrosebook.jpg";
import cofMug from "@/Assets/coffeMug.jpg";
import whiterose from "@/Assets/whiterose.jpg";
import oldrose from "@/Assets/oldrose.jpg";
import fpen from "@/Assets/fpen.jpg";
import pen from "@/Assets/pen.jpg";
import beachbirds from "@/Assets/beachbirds.jpg";
import beachboat from "@/Assets/beachboat.jpg";
import beachstarfish from "@/Assets/beachstarfish.jpg";
import waves from "@/Assets/waves.jpg";
import beachsun from "@/Assets/beachsun.jpg";
import beachtree from "@/Assets/beachtree.jpg";
import beachview from "@/Assets/beachview.jpg";
import lp1 from "@/Assets/lp1.jpg";
import lp2 from "@/Assets/lp2.jpg";
import lp3 from "@/Assets/lp3.jpg";
import lp4 from "@/Assets/lp4.jpg";
import lp5 from "@/Assets/lp5.jpg";
import { CiLogout } from "react-icons/ci";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub,
  FaInstagram,
  FaInstagramSquare,
  FaTwitter,
} from "react-icons/fa";
import CursorAnimation from "@/components/Cursor";
import { FaLinkedin } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PictureH from "@/Assets/PicturesH"

const Page = () => {
  const [user, setUser] = useState<any>("");
  const [poem, setPoem] = useState<any>("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const getUserDetails = async () => {
      const res = await fetch("/api/me");
      const result = await res.json();
      console.log(result.data._id);
      setUser(result.data);
    };

    getUserDetails();
  }, []);

  return (
    <>
      <Header />
      <CursorAnimation />
      <div className="w-full overflow-x-hidden min-h-full lg:flex lg:flex-col mt-5 ">
        <div id="page1" className="w-full relative flex h-[89.4vh] items-center justify-center">
          <div>
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {PictureH.map((pic , index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <Image src={pic?.image} alt="Home iMAGE" className="text-4xl font-semibold object-cover rounded-md"/>
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
    </>
  );
};

export default Page;
