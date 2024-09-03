import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Post from "@/models/postModel";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    interface JwtPayloadWithId extends jwt.JwtPayload {
      id: string;
    }   
    await connect();

    const { postId, commentId } = params;
    const token = req.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const secretKey = process.env.JWT_SECRET_KEY!;
    const decoded = jwt.verify(token, secretKey) as JwtPayloadWithId;
    const userId = decoded?.id;

    const post = await Post.findById(postId);
    if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 });

    const comment = post.comments.id(commentId);
    if (!comment) return NextResponse.json({ message: "Comment not found" }, { status: 404 });

    if (comment.author.toString() !== userId) {
      return NextResponse.json(
        { message: "Unauthorized: You can only delete your own comments" },
        { status: 403 }
      );
    }

    // Remove the comment from the comments array
    post.comments.pull(commentId);
    await post.save();

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
