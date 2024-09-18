"use client";

import React, { createContext, useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/Assets/blog_pic_4.png";
import { CiLogout } from "react-icons/ci";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import { FaUser } from "react-icons/fa6";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"




const Header = () => {
  const { setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [id, setId] = useState(null);
  const [username, setUsername] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);

  // const id = window.location.pathname.split("/").pop(); // Extract ID from the URL path

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setUsername(value);
    if(value) {
      searchUsers(value); // Automatically search users as you type
    } else {
      setUsers([]); // Clear users list if input is empty
    }
  };

  const router = useRouter();

  const handleLogIn = () => {
    if (!isLoggedIn) {
      router.replace("/login");
    } else {
      return;
    }
  };

  useEffect(() => {
    const me = async () => {
      try {
        const res = await fetch(`/api/me`);
        const result = await res.json();
        console.log(result.data._id);
        setId(result.data._id);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    me();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      const getUserDetails = async () => {
        try {
          const res = await fetch("/api/me");
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const result = await res.json();
          setIsLoggedIn(result.isLoggedIn);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      getUserDetails();
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      if (confirm("Do you really want to logout")) {
        const response = await fetch("/api/logout");
        if (response.ok) {
          router.replace("/");
          return;
        } else {
          throw new Error("Failed to log out");
        }
      }
    } catch (error: any) {
      return console.log(error.message);
    }
  };

  const searchUsers = async (username: string) => {
    try {
      const response = await fetch(`/api/search/${username}`);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();
      setUsers(users);
      console.log(users);
      // Process the users data as needed
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-10 py-2">
        <div
          onClick={() => {
            router.push("/header");
          }}
          className="flex font-bold font-Amsterdam text-xl"
        >
          p<p className="text-red-700 mt-[6px] font-bold font-Amsterdam">OET</p>{" "}
          <p className="mt-3">s</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col gap-2">
          <Input type="text" value={username} onChange={handleInputChange} placeholder="Username" />
          <div className=" flex flex-col w-[14.5vw] z-30 absolute rounded-md top-10">
            {users.map((user) => {
              return (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  key={user._id}
                  className="mt-4 text-sm font-semibold  w-full"
                >
                  <Button variant="outline"
                    className=" w-full"
                    onClick={() => {
                      router.push(`/profile/${user._id}`);
                    }}
                  >
                    {user.username}
                  </Button>
                </motion.div>
              );
            })}
          </div>
          </div>
          
        </div>

        <div className="flex gap-5 text-md font-Amsterdam">
          <Button variant="ghost">Home</Button>
          <p
            onClick={() => {
              router.push(`/latestPoems/${id}`);
            }}
          >
            <Button variant="ghost">Latest Poems</Button>
          </p>
          <motion.p
            onClick={() => {
              router.push("/post");
            }}
            whileHover={{ scale: 1.2, rotate: 3600 }}
            className="text-green-700 font-bold cursor-pointer"
          >
            <Button variant="ghost">{isLoggedIn ? "Post" : ""}</Button>
          </motion.p>
          <Button variant="ghost">About Us</Button>
          <p onClick={handleLogIn} className="cursor-pointer">
            <Button variant="ghost">{isLoggedIn ? "Enjoy" : "LogIn/SignUp"}</Button>
          </p>
        </div>

        <div className="flex items-center justify-center gap-10">
          <Button variant="ghost"
            onClick={() => {
              router.push(`/profile/${id}`);
            }}
            className=""
          >
            <FaUser />
          </Button>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <motion.div
            onClick={handleLogout}
            whileHover={{
              color: "red",
              x: [0, -8, 8, -8, 8, 0],
              y: [0, -2, 2, -2, 2, 0],
            }}
            className="cursor-pointer text-black"
          >
            <Button variant="outline">{isLoggedIn ? <CiLogout size={20} /> : ""}</Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Header;
