import Thought from '../models/Thought.js';
import User from '../models/User.js';
// Get all thoughts
export const getAllThoughts = async (_, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve thoughts', details: error });
    }
};
// Get a single thought by ID
export const getThoughtById = async (req, res) => {
    try {
        const { id } = req.params;
        const thought = await Thought.findById(id);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID' });
            return;
        }
        res.status(200).json(thought);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve thought', details: error });
    }
};
// Create a new thought and associate it with a user
export const createThought = async (req, res) => {
    try {
        const { thoughtText, username, userId } = req.body;
        // Create the new thought
        const thought = await Thought.create({ thoughtText, username });
        // Associate the thought with a user by pushing it into the user's thoughts array
        await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });
        res.status(201).json(thought);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create thought', details: error });
    }
};
// Update a thought by ID
export const updateThought = async (req, res) => {
    try {
        const { id } = req.params;
        const thoughtData = req.body;
        const thought = await Thought.findByIdAndUpdate(id, thoughtData, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID' });
            return;
        }
        res.status(200).json(thought);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update thought', details: error });
    }
};
// Delete a thought by ID
export const deleteThought = async (req, res) => {
    try {
        const { id } = req.params;
        const thought = await Thought.findByIdAndDelete(id);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID' });
            return;
        }
        // Optionally remove the thought reference from the associated user
        await User.findOneAndUpdate({ thoughts: id }, { $pull: { thoughts: id } });
        res.status(200).json({ message: 'Thought deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete thought', details: error });
    }
};
