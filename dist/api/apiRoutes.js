import { Router } from 'express';
import userController from '../controllers/usercontroller';
import thoughtController from '../controllers/thoughtcontroller';
const router = Router();
// User Routes
router.route('/users')
    .get(userController.getAllUsers)
    .post(userController.createUser);
router.route('/users/:userId')
    .get(userController.getSingleUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
router.route('/users/:userId/friends/:friendId')
    .post(userController.addFriend)
    .delete(userController.removeFriend);
// Thought Routes
router.route('/thoughts')
    .get(thoughtController.getAllThoughts)
    .post(thoughtController.createThought);
router.route('/thoughts/:thoughtId')
    .get(thoughtController.getSingleThought)
    .put(thoughtController.updateThought)
    .delete(thoughtController.deleteThought);
router.route('/thoughts/:thoughtId/reactions')
    .post(thoughtController.addReaction);
router.route('/thoughts/:thoughtId/reactions/:reactionId')
    .delete(thoughtController.removeReaction);
export default router;
