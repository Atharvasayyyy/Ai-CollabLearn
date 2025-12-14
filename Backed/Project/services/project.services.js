import project from '../models/project.models.js';
import mongoose from 'mongoose';

export const createProject = async (name, userId) => {
    if (!name || !userId) {
        throw new Error('Project name and user ID are required');
    }
    const newProject = new project({ name, user: userId });
    await newProject.save();
    return newProject;
};

export const getAllProjects = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    const projects = await project.find({ user: userId });
    return projects;
};
    

export const addUserToProject = async (projectId, users, userId) => {
  // 1️⃣ Basic validation
  if (!projectId || !users || !userId) {
    throw new Error('Project ID, users, and user ID are required');
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error('Invalid Project ID');
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid User ID');
  }

  if (!Array.isArray(users) || users.length === 0) {
    throw new Error('Users must be a non-empty array');
  }

  // 2️⃣ Validate each user ID
  for (const u of users) {
    if (!mongoose.Types.ObjectId.isValid(u)) {
      throw new Error(`Invalid user ID: ${u}`);
    }
  }

  // 3️⃣ Fetch project
  const projectDoc = await project.findById(projectId);
  if (!projectDoc) {
    throw new Error('Project not found');
  }

  // 4️⃣ Authorization check (only owner can add users)
  if (projectDoc.user.toString() !== userId.toString()) {
    throw new Error('Unauthorized to add users to this project');
  }

  // 5️⃣ Add users (no duplicates)
  const updatedProject = await project.findByIdAndUpdate(
    projectId,
    { $addToSet: { users: { $each: users } } },
    { new: true }
  );

  return updatedProject;
};