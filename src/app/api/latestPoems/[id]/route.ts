import Post from "@/models/postModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req : NextRequest , { params } : { params : { id : string}}){
    try {
        const { id } = params ;

        const user = await User.findById(id);
        
        if (!user) {
            return NextResponse.json({ message : 'User not found' }, { status : 404 })
        }

        const following = user.following ;

        const feedPosts = await Post.find({author : {$in : following}}).sort({createdAt: -1})

        return NextResponse.json({feedPosts})


    } catch (error : any) {
        console.error('Error:', error.message);
        return NextResponse.json({ message : 'Server Error' }, { status : 500 })
    }
} 