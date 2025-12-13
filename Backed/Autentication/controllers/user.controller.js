import user from '../models/user.model.js';
import { createUser } from '../services/user.services.js';
import { validationResult } from 'express-validator';
import redisClient from '../services/redis.services.js';

export const CreatUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newUser = await createUser(req.body.email, req.body.password);
        const token = newUser.generateAuthToken();
        res.status(201).json({ message: 'User created successfully', user: newUser, token });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const LoginUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const foundUser = await user.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isValid = await foundUser.isValidPassword(password);
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = foundUser.generateAuthToken();
        res.status(200).json({ message: 'Login successful', user: foundUser, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }   
};

export const UserProfileController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }        
    try {
        const userId = req.user._id;
        const foundUser = await user.findById(userId).select('-password');
        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user: foundUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const LogoutUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const token = req.cookies.token;
        if (token) {
            await redisClient.sadd('blacklisted_tokens', token);
            redisClient.expire('blacklisted_tokens', 3600);
        }
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
