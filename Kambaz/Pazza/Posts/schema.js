import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    // Post content info
    courseId: { type: String, required: true, index: true },
    type: { type: String, enum: ['question', 'note'], required: true },
    summary: { type: String, required: true, maxLength: 100 },
    details: { type: String, required: true },
    
    // Author info
    authorId: { type: String, required: true },
    authorRole: { type: String, enum: ['student', 'instructor'], required: true },
    
    // Visibility
    visibility: {
        type: { type: String, enum: ['entire_class', 'individual'], default: 'entire_class' },
        visibleTo: [{ type: String }] // Array of user IDs
    },
    
    // Tags
    folders: [{ type: String }],
    
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
{ collection: "posts" }
);

export default postSchema;