import { createProject } from '../services/project.services.js';
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
