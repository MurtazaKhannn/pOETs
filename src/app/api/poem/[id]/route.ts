import { connect } from "@/dbConfig/dbConfig"; // Assuming this is your connection function
import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connect(); // Ensure the connection is established
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ message: "Poem not found" }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error: any) {
    console.log("Error fetching poem:", error);
    return NextResponse.json({ message: "Error fetching poem." }, { status: 500 });
  }
}
