import Thought from '../models/Thought.js'; // Adjust the path as per your project structure
// Add a reaction to a thought
export const addReaction = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const reactionData = req.body;
        const thought = await Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: reactionData } }, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID' });
            return;
        }
        res.status(200).json(thought);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add reaction', details: error });
    }
};
// Remove a reaction from a thought
export const removeReaction = async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        const thought = await Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { reactionId: reactionId } } }, // Remove the reaction by reactionId
        { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID' });
            return;
        }
        res.status(200).json(thought);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to remove reaction', details: error });
    }
};
