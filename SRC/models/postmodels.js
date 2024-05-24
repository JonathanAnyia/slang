import { text } from "body-parser";
import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        postedBy: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            maxLength: 500,
        },
        img: {
            type: String,
        },
        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
        },
        replies: [
            {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            text: {
                type: string,
                required: true,
            },
            userProfilePic:{
                type: string,
            },
            userName: {
            type: String,
            },
            },
        ]
        },
        {
            timeStamps: true,
        }
);

const Post = mongoose.model("Post", postSchema);

export default Post;