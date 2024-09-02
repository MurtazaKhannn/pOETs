"use client";

import React, { createContext, useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/Assets/blog_pic_4.png";
import { CiLogout } from "react-icons/ci";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import { FaUser } from "react-icons/fa6";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [id, setId] = useState(null);
  const [username, setUsername] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);

  // const id = window.location.pathname.split("/").pop(); // Extract ID from the URL path

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setUsername(value);
    if (value) {
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
          <div className="flex gap-2">
            <input
              className="bg-zinc-900 font-teko text-xl rounded-md p-1 mt-1 w-[20vw] text-white"
              placeholder="Search"
              value={username}
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div className="bg-black flex flex-col text-white z-30 absolute w-[20.1vw] rounded-md top-10">
            {users.map((user) => {
              return (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  key={user._id}
                  className="p-2 text-sm font-semibold text-gray-700 hover:text-gray-900 text-white"
                >
                  <div className="text-zinc-300 hover:text-white" onClick={() => {router.push(`/profile/${user._id}`)}}>
                    {user.username}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-5 text-md font-Amsterdam">
          <p className="">Home</p>
          <p
            onClick={() => {
              router.push(`/latestPoems/${id}`);
            }}
          >
            Latest Poems
          </p>
          <motion.p
            onClick={() => {
              router.push("/post");
            }}
            whileHover={{ scale: 1.2, rotate: 3600 }}
            className="text-green-700 font-bold cursor-pointer"
          >
            {isLoggedIn ? "Post" : ""}
          </motion.p>
          <p>About us</p>
          <p onClick={handleLogIn} className="cursor-pointer">
            {isLoggedIn ? "Enjoy" : "LogIn/SignUp"}
          </p>
        </div>

        <div className="flex items-center justify-center gap-10">
          <div
            onClick={() => {
              router.push(`/profile/${id}`);
            }}
            className="hover:text-green-800"
          >
            <FaUser />
          </div>

          <motion.div
            onClick={handleLogout}
            whileHover={{
              color: "red",
              x: [0, -8, 8, -8, 8, 0],
              y: [0, -2, 2, -2, 2, 0],
            }}
            className="cursor-pointer"
          >
            {isLoggedIn ? <CiLogout size={30} /> : ""}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Header;
