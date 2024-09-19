"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import CursorAnimation from "@/components/Cursor";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FcLike } from "react-icons/fc";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";



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
        <h1 className="font-Amsterdam text-4xl absolute top-20 text-[#434348]">
          Latest Poems
        </h1>
        {loading ? (
          <p className="w-full flex items-center justify-center text-4xl">
            Loading...
          </p>
        ) : latestPoems.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
            }}
            orientation="vertical"
            className="w-full max-w-2xl"
          >
            <CarouselContent className="-mt-1 pr-1 h-[210px]">
              {latestPoems.map((poem, index) => (
                <CarouselItem key={index} className="pt-1 md:basis-1/2">
                  <div className="p-1 relative ">
                  <div className=" w-[41.8vw] h-[13vh] rounded-md absolute z-10 left-10 top-2 bg-black">
                  </div>

                    <Card className="absolute w-full z-20">
                      <CardContent className="flex items-center justify-center p-6 z-20">
                        <span
                          onClick={() => router.push(`/poem/${poem?._id}`)}
                          className="text-3xl font-semibold z-20"
                        >
                          {poem?.title}
                        </span>
                        <span className="absolute text-xs font-semibold bottom-1 right-4 font-teko">posted At : {poem?.createdAt .split("T")[0]}</span>
                        <span className="absolute flex gap-1 text-xs font-semibold bottom-1 left-4 font-teko"> <FcLike />{poem?.likes.length}</span>
                        <span className="absolute flex gap-1 text-xs font-semibold bottom-1 left-12 font-teko"> <HiOutlineChatBubbleBottomCenterText />{poem?.comments.length}</span>

                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          // latestPoems.map((poem) => (
          //   <div
          // onClick={() => router.push(`/poem/${poem?._id}`)}
          //     className="w-full flex gap-10 mt-20 flex-col items-center justify-center text-center bg-zinc-100 p-10 rounded-md"
          //     key={poem?._id}
          //   >
          //     <h1 className="font-teko text-4xl">{poem?.title}</h1>
          //     <h3 className="font-teko text-2xl break-words w-[70vw]">
          //       {poem?.content}
          //     </h3>
          //     <p className="font-tint text-xs">
          //       Posted At: {new Date(poem?.createdAt).toLocaleDateString()}
          //     </p>
          //   </div>
          // ))
          <p className="w-full flex items-center justify-center text-4xl">
            No poems found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
