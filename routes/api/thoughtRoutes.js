const router = require('express').Router();

const { 
    getThought,
    getThoughtById,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction
 } = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThought).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughId').get(getThoughtById).delete(deleteThought).put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:houghtId/reactions').post(addReaction);

// /api/thoughts/:thoughtID/:reactionId
router.route('/:toughtId/:reactionId').delete(removeReaction);

module.exports = router;
