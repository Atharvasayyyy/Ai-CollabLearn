import project from '../models/project.models.js';

export const createProject = async (name, userId) => {
    if (!name || !userId) {
        throw new Error('Project name and user ID are required');
    }
    const newProject = new project({ name, user: userId });
    await newProject.save();
    return newProject;
};
