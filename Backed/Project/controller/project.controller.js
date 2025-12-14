import { createProject, getAllProjects, addUserToProject } from '../services/project.services.js';
import { validationResult } from 'express-validator';

export const CreateProjectController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const project = await createProject(name, req.user._id);

    return res.status(201).json({
      message: 'Project created successfully',
      project
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const GetAllProjectsController = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const projects = await getAllProjects(req.user._id);
    return res.status(200).json({
      message: 'Projects retrieved successfully',
      projects
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  } 
};


export const addUserToProjectController = async (req, res) => { 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    if (!req.user || !req.user._id || !req.body.projectId || !req.body.users) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { projectId, users } = req.body;
    const updatedProject = await addUserToProject(projectId, users, req.user._id);
    return res.status(200).json({
      message: 'Users added to project successfully',
      project: updatedProject
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};
