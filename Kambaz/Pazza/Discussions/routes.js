import * as dao from "./dao.js";

export default function DiscussionRoutes(app) {
    
    const createDiscussion = async (req, res) => {
        try {
            const { postId } = req.params;
            const discussion = { ...req.body, postId };
            const newDiscussion = await dao.createDiscussion(discussion);
            res.json(newDiscussion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const getDiscussionsByPost = async (req, res) => {
        try {
            const { postId } = req.params;
            const discussions = await dao.getDiscussionsByPost(postId);
            res.json(discussions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const updateDiscussion = async (req, res) => {
        try {
            const { discussionId } = req.params;
            const updatedDiscussion = await dao.updateDiscussion(discussionId, req.body);
            if (!updatedDiscussion) {
                return res.status(404).json({ error: "Discussion not found" });
            }
            res.json(updatedDiscussion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const deleteDiscussion = async (req, res) => {
        try {
            const { discussionId } = req.params;
            const deletedDiscussion = await dao.deleteDiscussion(discussionId);
            if (!deletedDiscussion) {
                return res.status(404).json({ error: "Discussion not found" });
            }
            res.json({ message: "Discussion deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const toggleResolved = async (req, res) => {
        try {
            const { discussionId } = req.params;
            const updatedDiscussion = await dao.toggleResolved(discussionId);
            if (!updatedDiscussion) {
                return res.status(404).json({ error: "Discussion not found" });
            }
            res.json(updatedDiscussion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const addReply = async (req, res) => {
        try {
            const { discussionId } = req.params;
            const reply = req.body;
            const updatedDiscussion = await dao.addReply(discussionId, reply);
            if (!updatedDiscussion) {
                return res.status(404).json({ error: "Discussion not found" });
            }
            res.json(updatedDiscussion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const addNestedReply = async (req, res) => {
        try {
            const { discussionId, replyId } = req.params;
            const nestedReply = req.body;
            const updatedDiscussion = await dao.addNestedReply(discussionId, replyId, nestedReply);
            if (!updatedDiscussion) {
                return res.status(404).json({ error: "Discussion or reply not found" });
            }
            res.json(updatedDiscussion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    app.post("/api/posts/:postId/discussions", createDiscussion);
    app.get("/api/posts/:postId/discussions", getDiscussionsByPost);
    app.put("/api/discussions/:discussionId", updateDiscussion);
    app.delete("/api/discussions/:discussionId", deleteDiscussion);
    app.patch("/api/discussions/:discussionId/toggle-resolved", toggleResolved);
    app.post("/api/discussions/:discussionId/replies", addReply);
    app.post("/api/discussions/:discussionId/replies/:replyId/replies", addNestedReply);
}