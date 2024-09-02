import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(req: NextRequest, { params } : { params: { id: string } }) {
    await connect();
    const { id } = params;

    if (!id) {
        return NextResponse.json({ message: "Bad Request: No ID provided" }, { status: 400 });
    }

    const post = await Post.findById(id);
    if(!post){
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const token = req.cookies.get("token")?.value || ""; // Adjust this based on where you're storing the token

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

    let decoded: { id: string };

    try {
        decoded = jwt.verify(token, secretKey) as { id: string };
    } catch (err) {
        return NextResponse.json(
            { message: "Unauthorized: Invalid token" },
            { status: 401 }
        );
    }

    const userId = decoded.id;
    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
        // Unlike
        await Post.updateOne({ _id: id }, { $pull: { likes: userId } });
        return NextResponse.json({ message: "Post Unliked successfully" });
    } else {
        // Like
        await Post.updateOne({ _id: id }, { $push: { likes: userId } });
        return NextResponse.json({ message: "Post Liked successfully" });
    }
}
