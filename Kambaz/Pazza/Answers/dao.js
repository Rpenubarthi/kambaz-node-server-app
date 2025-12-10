import model from "./model.js";

// Create a new answer
export const createAnswer = (answer) => {
    return model.create(answer);
};

// Get all answers for a post
export const getAnswersByPost = (postId) => {
    return model.find({ postId }).sort({ createdAt: 1 });
};

// Get student answers for a post
export const getStudentAnswers = (postId) => {
    return model.find({ postId, authorRole: 'student' }).sort({ createdAt: 1 });
};

// Get instructor answers for a post
export const getInstructorAnswers = (postId) => {
    return model.find({ postId, authorRole: 'instructor' }).sort({ createdAt: 1 });
};

// Update an answer
export const updateAnswer = (answerId, answer) => {
    return model.findByIdAndUpdate(answerId, { ...answer, updatedAt: Date.now() }, { new: true });
};

// Delete an answer
export const deleteAnswer = (answerId) => {
    return model.findByIdAndDelete(answerId);
};