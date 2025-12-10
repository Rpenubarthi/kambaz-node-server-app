import * as dao from "./dao.js";

export default function PostRoutes(app) {
    
    const createPost = async (req, res) => {
        try {
            const { courseId } = req.params;
            const post = { ...req.body, courseId };
            const newPost = await dao.createPost(post);
            res.json(newPost);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const getPostsForCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const { userId, userRole, folder, search } = req.query;
            
            let posts;
            if (search) {
                posts = await dao.searchPosts(courseId, search, userId, userRole);
            } else if (folder) {
                posts = await dao.getPostsByFolder(courseId, folder, userId, userRole);
            } else {
                posts = await dao.getPostsForCourse(courseId, userId, userRole);
            }
            
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const getPostById = async (req, res) => {
        try {
            const { postId } = req.params;
            const post = await dao.getPostById(postId);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            res.json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const updatePost = async (req, res) => {
        try {
            const { postId } = req.params;
            const updatedPost = await dao.updatePost(postId, req.body);
            if (!updatedPost) {
                return res.status(404).json({ error: "Post not found" });
            }
            res.json(updatedPost);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const deletePost = async (req, res) => {
        try {
            const { postId } = req.params;
            const deletedPost = await dao.deletePost(postId);
            if (!deletedPost) {
                return res.status(404).json({ error: "Post not found" });
            }
            res.json({ message: "Post deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    app.post("/api/courses/:courseId/posts", createPost);
    app.get("/api/courses/:courseId/posts", getPostsForCourse);
    app.get("/api/posts/:postId", getPostById);
    app.put("/api/posts/:postId", updatePost);
    app.delete("/api/posts/:postId", deletePost);
}