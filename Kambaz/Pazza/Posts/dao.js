import model from "./model.js";

// Create a new post
export const createPost = (post) => {
    return model.create(post);
};

// Get all posts for a course (filtered by user visibility)
export const getPostsForCourse = async (courseId, userId, userRole) => {

    let query = { courseId };

    // If instructor, show all posts
    if (userRole === 'instructor') {
        const posts = await model.find(query).sort({ createdAt: -1 });
        return posts;
    }

    // For students, filter by visibility
    query = {
        courseId,
        $or: [
            { 'visibility.type': 'entire_class' },
            { 'visibility.visibleTo': userId },
            { authorId: userId }
        ]
    };

    const posts = await model.find(query).sort({ createdAt: -1 });

    return posts;
};

// Get posts filtered by folder
export const getPostsByFolder = async (courseId, folder, userId, userRole) => {

    let query = { courseId, folders: folder };

    if (userRole !== 'instructor') {
        // Students filter by visibility
        const allPosts = await model.find({ courseId, folders: folder });
        const filteredPosts = allPosts.filter(post => {
            return post.visibility.type === 'entire_class' ||
                post.visibility.visibleTo.includes(userId) ||
                post.authorId === userId;
        });
        return filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
    let posts;

    if (userRole === 'instructor') {
        posts = await model.find({
            courseId,
            $or: [
                { summary: { $regex: searchTerm, $options: 'i' } },
                { details: { $regex: searchTerm, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });
    } else {
        const allPosts = await model.find({
            courseId,
            $or: [
                { summary: { $regex: searchTerm, $options: 'i' } },
                { details: { $regex: searchTerm, $options: 'i' } }
            ]
        });

        posts = allPosts.filter(post => {
            return post.visibility.type === 'entire_class' ||
                post.visibility.visibleTo.includes(userId) ||
                post.authorId === userId;
        });

        posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return posts;
};