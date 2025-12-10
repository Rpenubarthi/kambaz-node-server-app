import model from "./model.js";

// Create a new post
export const createPost = (post) => {
    return model.create(post);
};

// Get all posts for a course (filtered by user visibility)
export const getPostsForCourse = async (courseId, userId, userRole) => {
    let query = { courseId };
    
    // If instructor, show all posts
    if (userRole !== 'instructor') {
        // Students only see: entire_class posts, posts visible to them, or their own posts
        query.$or = [
            { 'visibility.type': 'entire_class' },
            { 'visibility.visibleTo': userId },
            { authorId: userId }
        ];
    }
    
    return model.find(query).sort({ createdAt: -1 });
};

// Get posts filtered by folder
export const getPostsByFolder = async (courseId, folder, userId, userRole) => {
    let query = { courseId, folders: folder };
    
    if (userRole !== 'instructor') {
        query.$or = [
            { 'visibility.type': 'entire_class' },
            { 'visibility.visibleTo': userId },
            { authorId: userId }
        ];
    }
    
    return model.find(query).sort({ createdAt: -1 });
};

// Get a single post by ID
export const getPostById = (postId) => {
    return model.findById(postId);
};

// Update a post
export const updatePost = (postId, post) => {
    return model.findByIdAndUpdate(postId, { ...post, updatedAt: Date.now() }, { new: true });
};

// Delete a post
export const deletePost = (postId) => {
    return model.findByIdAndDelete(postId);
};

// Search posts by text
export const searchPosts = async (courseId, searchTerm, userId, userRole) => {
    let query = {
        courseId,
        $or: [
            { summary: { $regex: searchTerm, $options: 'i' } },
            { details: { $regex: searchTerm, $options: 'i' } }
        ]
    };
    
    if (userRole !== 'instructor') {
        query.$and = [
            query,
            {
                $or: [
                    { 'visibility.type': 'entire_class' },
                    { 'visibility.visibleTo': userId },
                    { authorId: userId }
                ]
            }
        ];
    }
    
    return model.find(query).sort({ createdAt: -1 });
};