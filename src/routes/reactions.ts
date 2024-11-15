import { Router } from 'express';
import { addReaction, removeReaction } from '../controllers/reactionController.js';

const router = Router();

// Routes for reaction-related operations
router.post('/:thoughtId/reactions', addReaction);                 
router.delete('/:thoughtId/reactions', removeReaction); 

export default router;