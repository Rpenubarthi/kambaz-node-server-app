import * as dao from "./dao.js";

export default function AnswerRoutes(app) {
    
    const createAnswer = async (req, res) => {
        try {
            const { postId } = req.params;
            const answer = { ...req.body, postId };
            const newAnswer = await dao.createAnswer(answer);
            res.json(newAnswer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const getAnswersByPost = async (req, res) => {
        try {
            const { postId } = req.params;
            const { role } = req.query;
            
            let answers;
            if (role === 'student') {
                answers = await dao.getStudentAnswers(postId);
            } else if (role === 'instructor') {
                answers = await dao.getInstructorAnswers(postId);
            } else {
                answers = await dao.getAnswersByPost(postId);
            }
            
            res.json(answers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const updateAnswer = async (req, res) => {
        try {
            const { answerId } = req.params;
            const updatedAnswer = await dao.updateAnswer(answerId, req.body);
            if (!updatedAnswer) {
                return res.status(404).json({ error: "Answer not found" });
            }
            res.json(updatedAnswer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const deleteAnswer = async (req, res) => {
        try {
            const { answerId } = req.params;
            const deletedAnswer = await dao.deleteAnswer(answerId);
            if (!deletedAnswer) {
                return res.status(404).json({ error: "Answer not found" });
            }
            res.json({ message: "Answer deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    app.post("/api/posts/:postId/answers", createAnswer);
    app.get("/api/posts/:postId/answers", getAnswersByPost);
    app.put("/api/answers/:answerId", updateAnswer);
    app.delete("/api/answers/:answerId", deleteAnswer);
}