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
router.route('/:thoughtId').get(getThoughtById).delete(deleteThought).put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtID/:reactionId
router.route('/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;
