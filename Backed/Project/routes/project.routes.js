import express from 'express';
import { body } from 'express-validator';
import { CreateProjectController, GetAllProjectsController,addUserToProjectController } from '../controller/project.controller.js';
import { authMiddleware } from '../../Autentication/middleware/auth.middleware.js';
const router = express.Router();

router.post('/create',
  body('name').notEmpty().withMessage('Project name is required'),
  authMiddleware,
  CreateProjectController
);

router.get('/all', 
  authMiddleware, 
  GetAllProjectsController
);

router.put(
  '/add-user',
  authMiddleware,
  [
    body('projectId')
      .notEmpty()
      .withMessage('Project ID is required'),

    body('users')
      .isArray({ min: 1 })
      .withMessage('Users must be a non-empty array')
  ],
  addUserToProjectController
);

export default router;