"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import CursorAnimation from "@/components/Cursor";
import Image from "next/image";
import profilePic from "@/Assets/kareya.jpg";
import { TiTickOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";

const Page = () => {
  type User = {
    _id: string;
    username: string;
    posts: number;
    followers: string[]; // Array of user IDs
    following: string[]; // Array of user IDs
    isVerified: boolean;
    about : string; 
  };

  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [latestPoems, setLatestPoems] = useState<any[]>([]);
  const [uid, setUid] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const id = window.location.pathname.split("/").pop(); // Extract ID from the URL path

  // Handle Follow/Unfollow action
  const handleFollowUnfollow = async () => {
    if (!user || !id) return;

    try {
      const res = await fetch(`/api/followUnfollow/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      if (res.ok) {
        // Update the user state with the new followers and following count
        setUser((prevUser) => {
          if (!prevUser) return null;
          return {
            ...prevUser,
            followers: result.updatedUserToModify.followers,
            following: result.updatedUserToModify.following,
          };
        });

        // Update following status
        setIsFollowing((prevIsFollowing) => !prevIsFollowing);
      } else {
        console.error("Failed to follow/unfollow:", result.message);
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${id}`);
        const result = await res.json();

        if (res.ok) {
          setUser(result.user);
          setUid(result.user._id);
          // console.log("uid" , uid);
          
          setIsFollowing(result.user.followers.includes(uid)); // Check if current user is following
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    const fetchLatestPoems = async () => {
      try {
        const res = await fetch(`/api/userPoems/${id}`);
        const result = await res.json();

        if (res.ok) {
          setLatestPoems(result);
        } else {
          console.error("Failed to fetch latest poems:", res.status, res.statusText);
          setLatestPoems([]);
        }
      } catch (error) {
        console.error("Error fetching latest poems:", error);
        setLatestPoems([]);
      }
    };

    fetchLatestPoems();
    fetchUser();
  }, [id, uid]);

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <CursorAnimation />
      <div className="w-full h-auto flex flex-col">
        <div className="w-full h-[40vh] flex">
          <div className="left w-full flex items-center justify-around gap-10">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex flex-col w-[22vh] h-[22vh] bg-red-900 rounded-full overflow-hidden">
                <Image
                  className="object-cover"
                  src={profilePic}
                  alt=""
                  width={200}
                />
              </div>
              <div className="flex gap-5 items-center justify-center">
                <div className="flex items-center justify-center gap-1">
                  <h3 className="font-teko text-xl">{user?.username}</h3>
                  {user?.isVerified ? (
                    <TiTickOutline
                      className="mb-1 text-black bg-zinc-200 rounded-md border-2 bordeur-zinc-600"
                      size={20}
                    />
                  ) : null}
                </div>
                {uid && uid === id && (
                  <button
                    onClick={handleFollowUnfollow}
                    className="font-teko font-semibold text-md bg-zinc-300 rounded-md text-sm py-1 px-2"
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
              <h3 className="font-Amsterdam">{user?.about}</h3>
            </div>
            <div className="font-Amsterdam text-xl flex gap-10">
              <div className="flex flex-col items-center justify-center">
                <div>{latestPoems.length}</div>
                posts
              </div>
              <div className="flex flex-col items-center justify-center">
                <div>{user?.followers.length}</div>
                followers
              </div>
              <div className="flex flex-col items-center justify-center">
                <div>{user?.following.length}</div>
                following
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <hr className="w-[80vw] h-[0.2vh] rounded-md bg-black" />
        </div>
        <div className="w-full h-auto flex flex-col items-center gap-10">
          <div className="mt-5 font-tint text-5xl">Poems/Shayris</div>
          <div className="w-[70vw] h-auto mt-10 flex flex-col gap-[20vh]">
            {latestPoems.map((poem) => (
              <div
                onClick={() => router.push(`/poem/${poem._id}`)}
                className="w-full flex flex-col gap-4 items-center justify-center mb-5 bg-zinc-100 p-10 rounded-md"
                key={poem._id}
              >
                <h1 className="font-teko text-4xl text-center">{poem.title}</h1>
                <h3 className="font-teko text-2xl max-w-full break-words text-center">
                  {poem.content}
                </h3>
                <p className="font-tint text-xs text-center">
                  posted At : {new Date(poem.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
