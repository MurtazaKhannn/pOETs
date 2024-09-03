"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import CursorAnimation from "@/components/Cursor";
import { useRouter } from "next/navigation";

const Page = () => {
  const [latestPoems, setLatestPoems] = useState<any[]>([]);
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const me = async () => {
      try {
        const res = await fetch(`/api/me`);
        const result = await res.json();
        console.log(result.data._id);
        setId(result.data._id);
      } catch (err : any) {
        console.error("Error fetching user:", err);
      }
    };

    me();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchLatestPoems = async () => {
        try {
          const res = await fetch(`/api/latestPoems/${id}`);
          const result = await res.json();

          if (res.ok) {
            console.log(result.feedPosts);
            console.log("hello");
            
            setLatestPoems(result.feedPosts);
          } else {
            console.error(
              "Failed to fetch latest poems:",
              res.status,
              res.statusText
            );
            setLatestPoems([]);
          }
        } catch (error) {
          console.error("Error fetching latest poems:", error);
          setLatestPoems([]);
        } finally {
          setLoading(false); // Set loading to false after the fetch is complete
        }
      };

      fetchLatestPoems();
    }
  }, [id]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="w-full absolute top-0">
        <Header />
      </div>
      <CursorAnimation />
      <div className="w-full  h-full flex flex-col mt-10 justify-center items-center p-10">
        <h1 className="font-Amsterdam text-4xl text-[#434348]">Latest Poems</h1>
        {loading ? (
          <p className="w-full font-Amsterdam h-[80vh] text-4xl flex items-center justify-center">Loading...</p> 
        ) : latestPoems.length > 0 ? (
          latestPoems.map((poem) => (
            <div
              onClick={() => router.push(`/poem/${poem?._id}`)}
              className="w-full h-full flex gap-10 mt-20 flex-col items-center justify-center text-center bg-zinc-100 p-10 rounded-md"
              key={poem?._id}
            >
              <h1 className="font-teko text-4xl">{poem?.title}</h1>
              <h3 className="font-teko text-2xl break-words w-[70vw]">
                {poem?.content}
              </h3>
              
              <p className="font-tint text-xs">
                posted At : {poem?.createdAt.split("T")[0]}
              </p>
            </div>
          ))
        ) : (
          <p className="w-full font-Amsterdam h-[80vh] text-4xl flex items-center justify-center">No poems found.</p> 
        )}
      </div>
    </div>
  );
};

export default Page;
