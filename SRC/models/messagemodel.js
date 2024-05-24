import mongoose from "mongoose";
import Conversation from "./conversation";


const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            types: mongoose.Schema.Types.ObjectId, 
            ref: "conversation",
        },
        sender:{type: mongoose.Schema.Types.ObjectId},
        text: String,
        seen:{
            type: Boolean,
            default: false,
        },
        img: {
            type: String,
            default: "",
        },
    },
    { timestamp: true}
);

const Message = mongoose.model("Message", messageSchema)

export default Message;