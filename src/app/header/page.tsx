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

const Page = () => {
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

  const [user, setUser] = useState<any>("");
  const [poem, setPoem] = useState<any>("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handlePoem = async () => {
      try {
        await fetch("https://poetrydb.org/random")
          .then((response) => response.json())
          .then((data) => {
            console.log(data[0]);
            // setPoem(data[0].lines);
          })
          .catch((error) => console.error("Error:", error));
      } catch (error: any) {
        console.error("Error fetching poem data:", error);
      }
    };

    const getUserDetails = async () => {
      const res = await fetch("/api/me");
      const result = await res.json();
      console.log(result.data._id);
      setUser(result.data);
    };

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
      { rotate: 0, scale: 1 }, // Initial state
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

    gsap.fromTo(
      "#page2 .type-writer",
      { opacity: 1 },
      {
        opacity: 1,
        duration: 2,
        scale: 1.4,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".type-writer",
          start: "top 50%",
          end: "top 20%",
          scrub: 1,
          markers: true, // Enable markers to debug
        },
      }
    );

    gsap.fromTo(
      "#page2 .typeW",
      { opacity: 1 },
      {
        opacity: 1,
        duration: 2,
        scale: 0.65,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".type-writer",
          start: "top 50%",
          end: "top 20%",
          scrub: 1,
          markers: true, // Enable markers to debug
        },
      }
    );

    gsap.fromTo(
      "#page2 .typeWP",
      { opacity: 1, scale: 0.65 },

      {
        opacity: 1,
        duration: 2,
        scale: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".type-writer",
          start: "top 50%",
          end: "top 20%",
          scrub: 1,
          markers: true, // Enable markers to debug
        },
      }
    );

    gsap.fromTo(
      "#page3 ",
      { opacity: 1 },
      {
        opacity: 1,
        duration: 2,
        scale: 0.65,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#page3",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
          markers: true, // Enable markers to debug
        },
      }
    );

    gsap.fromTo(
      "#page4 .redrose",
      { opacity: 1, scale: 0 },
      {
        opacity: 1,
        duration: 0.5,
        scale: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".redrose",
          start: "top 50%",
          end: "top 40%",
          scrub: 3,
          markers: true, // Enable markers to debug
        },
      }
    );

    gsap.fromTo(
      ".whiterose",
      { opacity: 1, scale: 0 },
      {
        opacity: 1,
        duration: 2,
        scale: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".whiterose",
          start: "top 70%",
          end: "top 50%",
          scrub: 3,
          markers: true, // Enable markers to debug
        },
      }
    );

    gsap.fromTo(
      ".oldrose",
      { opacity: 1, scale: 0 },
      {
        opacity: 1,
        duration: 1.5,
        scale: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".oldrose",
          start: "top 70%",
          end: "top 68%",
          scrub: 3,
          markers: true, // Enable markers to debug
        },
      }
    );

    gsap.fromTo(
      ".fpen",
      { opacity: 1, scale: 0 },
      {
        opacity: 1,
        duration: 1.5,
        scale: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".fpen",
          start: "top 70%",
          end: "top 65%",
          scrub: 3,
          markers: true, // Enable markers to debug
        },
      }
    );

    gsap.fromTo(
      ".pen",
      { opacity: 1, scale: 0 },
      {
        opacity: 1,
        duration: 1.5,
        scale: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".pen",
          start: "top 75%",
          end: "top 68%",
          scrub: 3,
          markers: true, // Enable markers to debug
        },
      }
    );

    gsap.fromTo(
      "#page4",
      { scale: 1, opacity: 1 },
      {
        scale: 0.9,
        opacity: 1,
        scrollTrigger: {
          trigger: "#page4",
          start: "top 20%",
          end: "top 10%",
          scrub: 3,
          markers: true,
          // pin:true
        },
      }
    );

    gsap.to("#page1 h1", {
      transform: "translateX(-50%)", // Adjusted for better performance
      scrollTrigger: {
        trigger: "#page1",
        scroller: "body",
        start: "top 10%",
        end: "top-90%",
        scrub: 2,
        markers: true,
        pin: true,
        pinSpacing: false, // Consider adding this if pinning causes layout issues
      },
    });

    gsap.fromTo(
      "#beachboat",
      {
        opacity: 0,
        x: 700,
        duration: 2,
        ease: "power2.out",
      },
      {
        opacity: 0.3,
        x: 0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#page1",
          scroller: "body",
          start: "top 10%",
          end: "top-90%",
          scrub: 2,
          markers: true,
          pin: true,
          pinSpacing: false, // Consider adding this if pinning causes layout issues
        },
      }
    );


    gsap.fromTo(".lp1", { y: "0%" }, { y: "100%", duration: 1, repeat: -1, yoyo: true });

    gsap.fromTo(".lp2", { y: "0%" }, { y: "100%", duration: 1, repeat: -1, yoyo: true });

    gsap.fromTo(".lp3", { y: "0%" }, { y: "100%", duration: 1, repeat: -1, yoyo: true });

    gsap.fromTo(".lp4", { y: "0%" }, { y: "100%", duration: 1, repeat: -1, yoyo: true });

    gsap.fromTo(".lp5", { y: "0%" }, { y: "100%", duration: 1, repeat: -1, yoyo: true });


    // gsap.to('#images', {
    //   transform: 'translateX(-50%)', // Adjusted for better performance
    //   scrollTrigger: {
    //     trigger: "#page1",
    //     scroller: "body",
    //     start: "top 10%",
    //     end: "top-90%",
    //     scrub: 2,
    //     markers: true,
    //     pin: true,
    //     pinSpacing: false, // Consider adding this if pinning causes layout issues
    //   },
    // });

    handlePoem();
    getUserDetails();
  }, []);

  return (
    <>
      <Header />
      <CursorAnimation />
      <div className="w-full overflow-x-hidden min-h-full lg:flex lg:flex-col mt-5 ">
        <div id="page1" className="w-full relative flex h-[90vh]">
          <h1 className="font-Amsterdam absolute flex items-center mt-[-h] justify-center text-[40vw]">
            EXPERIENCES
          </h1>

          <div className="absolute flex z-20 top-10 text-[10vw]">
            Create <p className="text-red-700">&nbsp;ART</p>
          </div>

          <div id="beachboat" className="aboslute flex opacity-0">
            <Image className="w-full h-full" src={beachboat} alt="" />
          </div>

          <div id="beachstarfish" className="aboslute flex">
            <Image className="w-full h-full" src={beachstarfish} alt="" />
          </div>
        </div>

        <div id="page2" className="flex relative flex-col  w-[100vw] h-[100vh]">
          <div className="up bg-red-800 flex flex-col gap-5 absolute h-[50vh] w-full ">
            <div className="flex items-center justify-center ">
              <Image
                className="z-20 w-[20vw] opacityy-0 rounded-md type-writer mt-[20vh]"
                src={typewriter}
                alt=""
                width={400}
              />
            </div>
          </div>
          <div className="down absolute   bg-zinc-800 h-[50vh] w-full ">
            <div className="min-w-full h-[50vh] flex inline mb-20">
              <h1 className="typeW absolute top-[29vw] overflow-x-hidden whitespace-nowrap font-Amsterdam  min-w-full text-[24.2vw] flex inline items-center justify-center mt-[-48vh] flex inline">
                Type Writer
                {/* {poem.title} */}
              </h1>
            </div>
          </div>

          <div className="down absolute   bg-zinc-800 w-full ">
            <div className="min-w-full flex inline mb-20">
              <h1 className="typeW absolute top-[32vw] left-[3vw] font-serif text-[1vw] flex flex-col">
                <p className="font-Amsterdam text-[1.5vw] mr-[7vw]">
                  Whispers on the <span className="text-pink-300">Page</span>
                </p>{" "}
                <br />
                Each key pressed, a story begins, <br /> Letters dance, where
                silence ends. <br /> In the rhythm of clacks, thoughts entwine,
                <br />A typewriter’s voice, in each word's line.
              </h1>
            </div>
          </div>

          <div className="down absolute bg-zinc-800 w-full ">
            <div className="min-w-full flex inline mb-20">
              <h1 className="typeWP absolute top-[4vw] right-[3vw] text-white font-sans text-[1vw] flex flex-col">
                <p className="font-Amsterdam text-[1.5vw] mr-[7vw]">
                  Typewriter &nbsp;
                  <span className="text-gray-400">Whispers</span>
                </p>{" "}
                <br />
                Under fingers, keys softly click,
                <br /> Words flow smooth, the rhythm’s quick.
                <br /> Ink and paper, old friends true,
                <br />
                Crafting stories, old and new.
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full h-[100vh] relative">
          {/* <div className="absolute z-[1] w-full h-full flex items-center text-[10vw] whitespace-nowrap font-Amsterdam overflow-hidden">"Poetry whispers the soul's deepest truths."</div> */}

          <div
            id="page3"
            className="flex absolute z-[2] flex-col w-full h-full"
          >
            <div className="up bg-black h-[50vh] w-full ">
              <div className="flex items-center justify-center ">
                <Image
                  className=" w-[60vw] opacityy-0 rounded-md type-writer mt-[9vh]"
                  src={cofMug}
                  alt=""
                  width={400}
                />
              </div>
              <div className="absolute">
                <h2>{poem}</h2>
              </div>
            </div>
            <div className="down h-[50vh] w-full ">
              <h1 className="flex">
                "Each sip from the mug stirs a world of &nbsp;
                <p className="font-Amsterdam text-yellow-300">
                  warmth and wonder."
                </p>
              </h1>
            </div>
          </div>

          <div className="pl-2 pt-2" id="mugB">
            <h2>
              <p className="font-bold flex font-Amsterdam w-[7vw] ">
                "Morning&nbsp;<p className="text-yellow-800">Brew</p>"
              </p>
              <br />
              <p className="mt-[-2.5vh]  w-[22vw] text-sm">
                In the warmth of a mug, my day begins, <br /> Golden brew swirls
                with whispered grins, <br /> Sips of solace, the world fades
                away, <br />
                In the embrace of coffee, I find my way.
              </p>
            </h2>
          </div>

          <div className="pl-[8vw] mt-[20vw]" id="mugB">
            <h2>
              <p className="font-bold flex font-Amsterdam w-[7vw] ">
                "Mug of&nbsp;<p className="text-red-700">Love</p>"
              </p>
              <br />
              <p className="mt-[-2.5vh]  w-[22vw] text-sm">
                In your hands, a mug so warm,
                <br />
                Filled with love in liquid form, <br />
                Every sip, a gentle touch, <br />
                Reminds me why I love you so much.
              </p>
            </h2>
          </div>

          <div className="pl-2 pt-2 absolute right-[-5vw]" id="mugM">
            <h2>
              <p className="font-bold font-Amsterdam w-[7vw] flex">
                "Mug of&nbsp;<p className="text-blue-200">Memories</p>"
              </p>
              <br />
              <p className="mt-[-2.5vh]  w-[22vw] text-xs">
                A mug of tea, warm in my hands, <br />
                Holds quiet tales of distant lands,
                <br />
                Each sip a story, each cup a friend, <br />
                In its gentle warmth, the moments blend.
              </p>
            </h2>
          </div>
        </div>

        <div id="page4" className="flex flex-col w-full h-full">
          <div className="relative up  h-[50vh] w-full ">
            <div className="flex redrose items-center justify-center ">
              <Image
                className="redrose z-40 w-[20vw] opacityy-0 rounded-md type-writer mt-[20vh]"
                src={redrose}
                alt=""
                width={400}
              />
            </div>

            <div className=" whiterose flex absolute top-10 right-80 items-center justify-center ">
              <Image
                className="z-20 w-[20vw] opacityy-0 rounded-md type-writer mt-[20vh]"
                src={whiterose}
                alt=""
                width={400}
              />
            </div>

            <div className="oldrose flex absolute top-[45vh] left-[25vw] items-center justify-center ">
              <Image
                className="z-20 w-[20vw] opacityy-0 rounded-md type-writer mt-[20vh]"
                src={oldrose}
                alt=""
                width={400}
              />
            </div>

            <div className="fpen flex absolute top-[18vh] left-[12vw] items-center justify-center ">
              <Image
                className="z-20 w-[20vw] opacityy-0 rounded-md type-writer mt-[20vh]"
                src={fpen}
                alt=""
                width={400}
              />
            </div>

            <div className="pen flex absolute top-[18vh] right-[2vw] items-center justify-center ">
              <Image
                className="z-20 w-[20vw] opacityy-0 rounded-md type-writer mt-[20vh]"
                src={pen}
                alt=""
                width={400}
              />
            </div>
          </div>
          <div className="down bg-red-800 h-[50vh] w-full ">
            <div className="min-w-full relative h-[50vh] flex inline mb-20">
              <h1 className="typeW font-extrabold absolute top-70 overflow-x-hidden whitespace-nowrap font-Amsterdam font-tint  min-w-full text-[14.2vw] flex inline items-center justify-center mt-[-48vh] flex inline">
                "خوابوں کی منزل"
              </h1>
            </div>
          </div>
        </div>

        <div
          id="page5"
          className="relative flex flex-col items-center justify-center gap-5 w-full h-[100vh]"
        >

          <div>
            <h1 className="font-bold font-Amsterdam">Join the Community</h1>
            <p className="font-teko">
              "Be part of a global network of poetry lovers. Share your
              creations, explore new styles, and connect with kindred spirits
              who understand the magic of words."
            </p>
          </div>


          <div className="flex items-center justify-center gap-5 text-2xl">
            <div className="text-red-700">
              <FaInstagram />
            </div>
            <div className="text-blue-400">
              <FaTwitter />
            </div>
            <div>
              <FaGithub />
            </div>
            <div className="text-blue-800">
              <FaLinkedin />
            </div>
          </div>

          <div>
            <h1 className="font-diss text-4xl text-red-800">
              SIMPLICITY &nbsp; IS &nbsp; ALSO &nbsp; BEAUTIFUL !
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
