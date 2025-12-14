import express from 'express';
import { body } from 'express-validator';
import { CreateProjectController } from '../controller/project.controller.js';
import { authMiddleware } from '../../Autentication/middleware/auth.middleware.js';
const router = express.Router();


router.post('/create',
  body('name').notEmpty().withMessage('Project name is required'),
  authMiddleware,
  CreateProjectController
);


export default router;