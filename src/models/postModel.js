import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // URL of the image associated with the post
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // No default value here
    comments: [
        {
            text: { type: String, required: true },
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            createdAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });

const Post = mongoose.models.posts || mongoose.model("posts", PostSchema);

export default Post;
