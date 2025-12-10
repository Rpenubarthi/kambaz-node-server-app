import model from "./model.js";

// Create a new discussion
export const createDiscussion = (discussion) => {
    return model.create(discussion);
};

// Get all discussions for a post
export const getDiscussionsByPost = (postId) => {
    return model.find({ postId }).sort({ createdAt: 1 });
};

// Update a discussion
export const updateDiscussion = (discussionId, discussion) => {
    return model.findByIdAndUpdate(discussionId, { ...discussion, updatedAt: Date.now() }, { new: true });
};

// Delete a discussion
export const deleteDiscussion = (discussionId) => {
    return model.findByIdAndDelete(discussionId);
};

// Toggle resolved status
export const toggleResolved = async (discussionId) => {
    const discussion = await model.findById(discussionId);
    if (!discussion) return null;
    discussion.resolved = !discussion.resolved;
    discussion.updatedAt = Date.now();
    return discussion.save();
};

// Add a reply to a discussion
export const addReply = async (discussionId, reply) => {
    return model.findByIdAndUpdate(
        discussionId,
        { 
            $push: { replies: reply },
            updatedAt: Date.now()
        },
        { new: true }
    );
};

// Add a reply to a reply (nested)
export const addNestedReply = async (discussionId, replyId, nestedReply) => {
    return model.findOneAndUpdate(
        { _id: discussionId, 'replies._id': replyId },
        { 
            $push: { 'replies.$.replies': nestedReply },
            updatedAt: Date.now()
        },
        { new: true }
    );
};