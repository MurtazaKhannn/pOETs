import { NextRequest, NextResponse } from 'next/server';
import Post from '@/models/postModel'; // Ensure this path is correct according to your project structure
import { connect } from '@/dbConfig/dbConfig'; // Ensure this path is correct according to your project structure
import jwt from 'jsonwebtoken';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Connect to the database
        await connect();

        const { id } = params;

        // Validate ID
        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }

        // Extract token from the request cookies or headers
        const token = req.cookies.get('token')?.value || ''; // Adjust this based on where you're storing the token

        if (!token) {
            return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
        }

        // Verify the token
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw new Error('JWT_SECRET_KEY is not defined');
        }

        const decoded: any = jwt.verify(token, secretKey);
        const userId = decoded.id;

        // Find the post by ID
        const post = await Post.findById(id);

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        console.log(post.author);
        console.log(userId);
        
        

        // Check if the post belongs to the authenticated user
        if (post.author.toString() !== userId.toString()) {
            return NextResponse.json({ message: "Unauthorized: You cannot delete this post" }, { status: 403 });
        }

        // Delete the post
        await Post.findByIdAndDelete(id);

        // Respond with success
        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });

    } catch (error: any) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ message: "Error deleting post" }, { status: 500 });
    }
}
