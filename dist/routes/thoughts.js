import { Router } from 'express';
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought } from '../controllers/thoughtController.js';
const router = Router();
router.get('/', getAllThoughts);
router.get('/:id', getThoughtById);
router.post('/', createThought);
router.put('/:id', updateThought);
router.delete('/:id', deleteThought);
export default router;
