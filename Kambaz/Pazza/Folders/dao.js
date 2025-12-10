import model from "./model.js";

// Create a new folder
export const createFolder = (folder) => {
    return model.create(folder);
};

// Get all folders for a course
export const getFoldersByCourse = (courseId) => {
    return model.find({ courseId });
};

// Update a folder
export const updateFolder = (folderId, folder) => {
    return model.findByIdAndUpdate(folderId, folder, { new: true });
};

// Delete a folder
export const deleteFolder = (folderId) => {
    return model.findByIdAndDelete(folderId);
};

// Delete multiple folders
export const deleteFolders = (folderIds) => {
    return model.deleteMany({ _id: { $in: folderIds } });
};