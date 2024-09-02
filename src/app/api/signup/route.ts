import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

// Named export for POST method
export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json(); // Use req.json() instead of req.body for Next.js

  if (!username || !email || !password) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    console.log("Connecting to MongoDB...");
    await connect();
    console.log("Connected to MongoDB, proceeding to create user...");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 

    const newUser = new User({
      username,
      email,
      password : hashedPassword,
      isVerified: false,
    });

    const savedUser = await newUser.save();

    await sendEmail({email , emailType: "VERIFY" , userId : savedUser._id})

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
