import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'; // Adjust the import path based on your project structure
import User from '@/models/userModel';
; // Your User model

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  let { username } = params;

  if (Array.isArray(username)) {
    username = username[0];  // Take the first value if it's an array
  }

  if (!username) {
    return NextResponse.json({ message: 'Username parameter is missing' }, { status: 400 });
  }

  try {
    await connect(); // Connect to the database
    const users = await User.find({ username: { $regex: username, $options: 'i' } }).limit(10);

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
