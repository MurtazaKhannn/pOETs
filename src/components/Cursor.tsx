"use client";

import React, { useEffect } from "react";
import "@/Public/cursor.css"; // Ensure your CSS is imported here

const CursorAnimation = () => {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    const handleMouseMove = (e : any) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => cursor.classList.add("large");
    const handleMouseLeave = () => cursor.classList.remove("large");

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeChild(cursor);
    };
  }, []);

  return null;
};

export default CursorAnimation;
