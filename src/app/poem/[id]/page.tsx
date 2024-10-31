"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { FaHeart, FaShare } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CursorAnimation from "@/components/Cursor";
import { PiChatTeardropTextBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  type Poem = {
    title: string;
    content: string;
    createdAt: Date;
    author: string;
    likes: string[];
    comments: Array<{
      author: string;
      text: string;
      authorUsername?: string;
      createdAt: string;
      _id: string;
    }>;
  };

  type User = {
    _id: string;
    username: string;
    email: string;
  };

  const [poem, setPoem] = useState<Poem | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [poemUser, setPoemUser] = useState<User | null>(null);
  const [commentText, setCommentText] = useState("");
  const [like , setLike] = useState(false);

  const id = window.location.pathname.split("/").pop();
  const router = useRouter();

  useEffect(() => {
    const getPoem = async () => {
      if (!id) {
        console.error("ID is not available");
        return;
      }
      try {
        const response = await fetch(`/api/poem/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPoem(data.post);
        console.log(data.post);

        // Fetch usernames for each comment's author
        const updatedComments = await Promise.all(
          data.post.comments.map(async (comment: any) => {
            const res = await fetch(`/api/user/${comment.author}`);
            const userData = await res.json();
            return { ...comment, authorUsername: userData.user.username };
          })
        );
        setPoem((prevPoem) =>
          prevPoem ? { ...prevPoem, comments: updatedComments } : prevPoem
        );
      } catch (error) {
        console.error("Error fetching poem:", error);
      }
    };

    const getCurrentUser = async () => {
      try {
        const res = await fetch("/api/me");
        const result = await res.json();
        setUser(result.data);
        console.log(result.data.username);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    getCurrentUser();
    getPoem();
  }, [id]); // Add 'id' to the dependency array to ensure the effect runs when 'id' changes

  useEffect(() => {
    const animateLines = () => {
      if (poem?.content) {
        const lines = gsap.utils.toArray(".line") as HTMLElement[];

        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { color: "#f0f0f0", scale: 0.6 , x :120 },
            {
              color: "#000000",
              scale: 1,
              x:0,
              scrollTrigger: {
                trigger: line,
                start: "top 70%",
                // markers: true,
                end: "top 50%",
                scrub: true,
              },
            }
          );
        });
      }
    };

    requestAnimationFrame(() => {
      animateLines();
    });
  }, [poem?.content]);

  useEffect(() => {
    const getPoemAuthor = async () => {
      if (!poem?.author) return;
      console.log("poem author", poem?.author);
      try {
        const res = await fetch(`/api/user/${poem.author}`);
        const result = await res.json();
        setPoemUser(result.user);
      } catch (error) {
        console.error("Error fetching poem author:", error);
      }
    };

    getPoemAuthor();
  }, [poem?.author]);

  const deletePost = async () => {
    const id = window.location.pathname.split("/").pop();
    try {
      if (confirm("Are you sure you want to delete")) {
        const response = await fetch(`/api/deletePost/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        alert("Post Deleted");
        console.log("Deleted poem");
      }
    } catch (error) {
      console.error("Error deleting poem:", error);
    }
  };

  const deleteComment = async (commentId: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      try {
        const response = await fetch(`/api/deleteComment/${id}/${commentId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setPoem((prevPoem) =>
          prevPoem
            ? {
                ...prevPoem,
                comments: prevPoem.comments.filter(
                  (comment) => comment._id !== commentId
                ),
              }
            : prevPoem
        );
        alert("Comment deleted successfully");
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const getLines = (content: string) => {
    return content.split("\n").map((line, index) => (
      <p key={index} className="line">
        {line}
      </p>
    ));
  };

  const likeUnlike = async () => {
    try {
      const res = await fetch(`/api/likeUnlike/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      if (result.message.includes("Liked")) {
        setPoem(
          (prevPoem) =>
            prevPoem && {
              ...prevPoem,
              likes: [...prevPoem?.likes, user?._id || ""],
            }
        );
        setLike(true)
      } else if (result.message.includes("Unliked")) {
        setPoem(
          (prevPoem) =>
            prevPoem && {
              ...prevPoem,
              likes: prevPoem?.likes.filter((like) => like !== user?._id),
            }
        );
        setLike(false);
      }

      console.log(result);
    } catch (error: any) {
      console.log("Error in like/unlike API", error);
    }
  };

  const submitComment = async (e: any) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const response = await fetch(`/api/comment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: commentText }),
      });

      const result = await response.json();
      if (response.ok) {
        const newComment = {
          ...result.comment,
          createdAt: new Date().toISOString(), // Set the createdAt field to the current date
          authorUsername: user?.username, // Set the authorUsername to the current user's username
        };

        setPoem((prevPoem) =>
          prevPoem
            ? { ...prevPoem, comments: [...prevPoem.comments, newComment] }
            : prevPoem
        );
        setCommentText(""); // Clear the comment input after submission
      } else {
        console.error("Failed to submit comment:", result.message);
      }
    } catch (error: any) {
      console.error("Error submitting comment:", error.message);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: poem?.title || "Check out this poem!",
          text: poem?.content || "Here's a great poem I found.",
          url: window.location.href,
        });
        console.log("Poem shared successfully");
      } catch (error) {
        console.error("Error sharing the poem:", error);
      }
    } else {
      console.error("Web Share API is not supported in this browser");
      alert("Sharing is not supported on your device.");
    }
  };
  

  return (
    <div className="relative w-full h-full flex flex-col">
      <CursorAnimation />
      <Header />
      {user?._id === poem?.author && (
        <div
          onClick={deletePost}
          className="absolute top-20 right-20 hover:text-red-700"
        >
          <MdDeleteOutline size={30} />
        </div>
      )}
      <div className="zoom w-full min-h-[92.2vh] gap-10 flex flex-col items-center justify-center mt-8">
        <h1 className="font-teko text-4xl font-semibold title">
          {poem?.title || "Loading..."}
        </h1>
        <div className="czoom font-teko text-2xl w-[70vw] break-words text-center mt-10">
          {poem ? getLines(poem.content) : "Please wait..."}
        </div>
        <div className="w-[50vw] rounded-md flex flex-col items-center justify-center p-10 gap-4">
          <div className="flex gap-10 font-Amsterdam">
            <div
              onClick={likeUnlike}
              className="flex items-center justify-center cursor-pointer"
            >
              <div  className={`p-2 ${like ? "text-red-600" : ""}`}>
                <FaHeart />
              </div>

              <p>{poem?.likes?.length}</p>
            </div>
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <PiChatTeardropTextBold onClick={() => {router.push("#comments")}} size={20} />
              <p>{poem?.comments?.length || 0}</p>
            </div>
            <div onClick={handleShare} className="flex items-center justify-center gap-2 cursor-pointer">
              <FaShare />
            </div>
          </div>
          <div className="font-dissolve flex justify-center items-center gap-2">
            <p className="font-teko text-2xl">Published by :</p>
            <p className="font-dissolve italic text-md font-Amsterdam text-xl mb-[.2vh]">
              {poemUser?.username || "Loading..."}
            </p>
          </div>
        </div>

        <div className="w-[80vw] ">
          {/* Comment Form */}
          <form onSubmit={submitComment} className="w-full mt-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded font-teko text-xl"
              rows={2}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
            <button
              type="submit"
              className="mt-2 p-2 bg-zinc-800 text-white rounded hover:bg-black font-Amsterdam"
            >
              Submit
            </button>
          </form>
        </div>

        <div id="comments" className="w-[98.9vw] min-h-[30vh] bg-zinc-900 rounded-md text-white flex flex-col items-start justify-start p-10 gap-4">
          <h2 className="text-xl font-semibold font-Amsterdam">Comments</h2>
          {poem?.comments.map((comment, index) => (
            <div key={index} className="mb-4 font-teko text-2xl">
              <div className="flex items-center gap-2 ">
                <p className="font-semibold">{comment.authorUsername}</p>
                {/* <FaRegClock size={12} /> */}
                <p className="text-gray-500 text-sm">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                {user?._id === comment?.author ? (
                  <button onClick={() => deleteComment(comment._id)}>
                    <MdDeleteOutline size={16} />
                  </button>
                ) : (
                  ""
                )}
              </div>
              <p className="text-xl w-[80vw] break-words">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
