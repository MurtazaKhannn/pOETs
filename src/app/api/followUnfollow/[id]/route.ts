import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();

    const { id } = params;

    // Validate ID
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    // Extract token from the request cookies or headers
    const token = req.cookies.get("token")?.value || ""; // Adjust this based on where you're storing the token

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    // Verify the token
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    const decoded: any = jwt.verify(token, secretKey);
    const currUserId = decoded.id;

    const userToModify = await User.findById(id);
    const currUser = await User.findById(currUserId);
    if (!userToModify || !currUser) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid user" },
        { status: 401 }
      );
    }

    const isFollowing = currUser.following.includes(id);
    if (isFollowing) {
      // Unfollow the user
      await User.findByIdAndUpdate(currUserId, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: currUserId } });
    } else {
      // Follow the user
      await User.findByIdAndUpdate(currUserId, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: currUserId } });
    }

    // Fetch the updated user data after follow/unfollow
    const updatedUserToModify = await User.findById(id);
    const updatedCurrUser = await User.findById(currUserId);

    return NextResponse.json(
      {
        message: isFollowing
          ? "User unfollowed successfully"
          : "User followed successfully",
        updatedUserToModify,
        updatedCurrUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error following/unfollowing user:", error);
    return NextResponse.json(
      { message: "Error following/unfollowing user" },
      { status: 500 }
    );
  }
}
