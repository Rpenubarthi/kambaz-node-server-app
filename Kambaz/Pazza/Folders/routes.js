import * as dao from "./dao.js";

export default function FolderRoutes(app) {
    
    const createFolder = async (req, res) => {
        try {
            const { courseId } = req.params;
            const folder = { ...req.body, courseId };
            const newFolder = await dao.createFolder(folder);
            res.json(newFolder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const getFoldersByCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const folders = await dao.getFoldersByCourse(courseId);
            res.json(folders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const updateFolder = async (req, res) => {
        try {
            const { folderId } = req.params;
            const updatedFolder = await dao.updateFolder(folderId, req.body);
            if (!updatedFolder) {
                return res.status(404).json({ error: "Folder not found" });
            }
            res.json(updatedFolder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const deleteFolder = async (req, res) => {
        try {
            const { folderId } = req.params;
            const deletedFolder = await dao.deleteFolder(folderId);
            if (!deletedFolder) {
                return res.status(404).json({ error: "Folder not found" });
            }
            res.json({ message: "Folder deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const deleteFolders = async (req, res) => {
        try {
            const { folderIds } = req.body;
            const result = await dao.deleteFolders(folderIds);
            res.json({ message: `${result.deletedCount} folders deleted successfully` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    app.post("/api/courses/:courseId/folders", createFolder);
    app.get("/api/courses/:courseId/folders", getFoldersByCourse);
    app.put("/api/folders/:folderId", updateFolder);
    app.delete("/api/folders/:folderId", deleteFolder);
    app.post("/api/folders/delete-many", deleteFolders);
}