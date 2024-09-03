import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Post from "@/models/postModel";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    interface JwtPayloadWithId extends jwt.JwtPayload {
      id: string;
    }    
    await connect();

    const { text } = await req.json();
    if (!text) {
      return NextResponse.json(
        { message: "Text is required" },
        { status: 400 }
      );
    }

    const { id } = params;
    const token = req.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, secretKey) as JwtPayloadWithId;
    } catch (error) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const author = decoded?.id;
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const comment = { author, text };
    post.comments.push(comment);
    await post.save();

    return NextResponse.json(
      { message: "Comment added successfully", comment },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in comment:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
