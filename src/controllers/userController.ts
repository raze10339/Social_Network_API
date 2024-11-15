import User from '../models/User.js';
import Thought from '../models/Thought.js';
import { Request, Response } from 'express';

// Get all users
export const getAllUsers = async (_: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get users', details: err });
    }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('thoughts').populate('friends');

        if (!user) {
            res.status(404).json({ message: 'No user found with that ID' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user', details: error });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user', details: err });
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userData = req.body;

        const user = await User.findByIdAndUpdate(id, userData, { new: true });

        if (!user) {
            res.status(404).json({ message: 'No user found with that ID' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user', details: error });
    }
};

// Delete a user and associated thoughts
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            res.status(404).json({ message: 'No user found with that ID' });
            return;
        }

        // Optionally, delete all thoughts associated with this user
        await Thought.deleteMany({ _id: { $in: user.thoughts } });

        res.status(200).json({ message: 'User and associated thoughts deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user', details: error });
    }
};

// Add a friend to a user's friend list
export const addFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, friendId } = req.params;

        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'No user found with that ID' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add friend', details: err });
    }
};

// Remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, friendId } = req.params;

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new: true }
        );

        if (!user) {
           res.status(404).json({ message: 'No user found with that ID' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove friend', details: err });
    }
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
};
