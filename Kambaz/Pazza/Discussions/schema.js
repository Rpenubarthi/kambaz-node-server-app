import mongoose from "mongoose";
import replySchema from "./replySchema.js";

const discussionSchema = new mongoose.Schema({
    postId: { type: String, required: true, index: true },
    authorId: { type: String, required: true },
    content: { type: String, required: true },
    resolved: { type: Boolean, default: false },
    replies: [replySchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
{ collection: "discussions" }
);

export default discussionSchema;