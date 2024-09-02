import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/postModel";
import User from "@/models/userModel";

export async function POST(req: NextRequest) {
  const { title, content, image, author } = await req.json();

  if (!title || !content || !author) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    console.log("Connecting to MongoDB...");
    await connect();
    console.log("Connected to MongoDB, proceeding to create post...");

    // Check if the user exists
    const user = await User.findOne({ username: author });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check for an existing post with the same title
    const existingPost = await Post.findOne({ title, author: user._id });
    if (existingPost) {
      return NextResponse.json({ message: "Post already exists" }, { status: 400 });
    }

    // Create and save a new post
    const newPost = new Post({
      title,
      content,
      image,
      author: user._id, // Store the author's ObjectId
    });

    await newPost.save(); // Save the new post to the database

    return NextResponse.json({
      message: "Post created successfully",
      post: newPost,
      status: 201
    });
  } catch (error: any) {
    console.log("Failed to post", error.message);
    return NextResponse.json({ message: "Failed to post poem." }, { status: 500 });
  }
}
