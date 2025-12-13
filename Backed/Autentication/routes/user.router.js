import { body } from 'express-validator';
import { Router } from 'express';
import { CreatUserController,LoginUserController,UserProfileController,LogoutUserController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/create',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    CreatUserController
);

router.post('/login',
    [
        body('email').isEmail().withMessage('Invalid email format'),    
        body('password').notEmpty().withMessage('Password is required')
    ],
    LoginUserController
);

router.get('/profile', (req, res) =>{
    authMiddleware(req, res, () => {
        UserProfileController(req, res);
    }
);
});

router.get('/logout', (req, res) =>{
    authMiddleware(req, res, () => {
        LogoutUserController(req, res);
    }
);
});


export default router;