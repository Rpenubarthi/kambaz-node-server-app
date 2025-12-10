import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    courseId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    order: { type: Number, default: 0 }, // For preserving folder order
},
{ collection: "folders" }
);

export default folderSchema;