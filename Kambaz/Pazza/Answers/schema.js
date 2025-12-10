import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    postId: { type: String, required: true, index: true },
    
    // Author info
    authorId: { type: String, required: true },
    authorRole: { type: String, enum: ['student', 'instructor'], required: true },
    
    // Content
    content: { type: String, required: true },
    
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
{ collection: "answers" }
);
export default answerSchema;