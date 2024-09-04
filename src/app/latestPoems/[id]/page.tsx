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

  // Fetch user ID when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/me`);
        const result = await res.json();
        setId(result.data._id);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  // Fetch latest poems when the user ID is available
  useEffect(() => {
    if (id) {
      const fetchLatestPoems = async () => {
        try {
          const res = await fetch(`/api/latestPoems/${id}`);
          const result = await res.json();

          if (res.ok) {
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
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
  <div className="w-full absolute top-0">
    <Header />
  </div>
  <CursorAnimation />
  <div className="w-full flex flex-col mt-10 justify-center items-center p-10">
    <h1 className="font-Amsterdam text-4xl text-[#434348]">Latest Poems</h1>
    {loading ? (
      <p className="w-full flex items-center justify-center text-4xl">Loading...</p>
    ) : latestPoems.length > 0 ? (
      latestPoems.map((poem) => (
        <div
          onClick={() => router.push(`/poem/${poem?._id}`)}
          className="w-full flex gap-10 mt-20 flex-col items-center justify-center text-center bg-zinc-100 p-10 rounded-md"
          key={poem?._id}
        >
          <h1 className="font-teko text-4xl">{poem?.title}</h1>
          <h3 className="font-teko text-2xl break-words w-[70vw]">
            {poem?.content}
          </h3>
          <p className="font-tint text-xs">
            Posted At: {new Date(poem?.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))
    ) : (
      <p className="w-full flex items-center justify-center text-4xl">No poems found.</p>
    )}
  </div>
</div>

  );
};

export default Page;
