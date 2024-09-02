import Post from "@/models/postModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: String } }
) {
    const { id } = params ;
    const posts = await Post.find({ author : id }).sort({createdAt: -1});

    if(!posts){
        return NextResponse.json({ message: "post not found" }, { status: 404 });
    }

    return NextResponse.json(posts);
}
