const router = require('express').Router();

const {
    getAllThought,
    findThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// Setup GET all and POST in /api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

// Setup GET one, PUT, and DELETE in /api/thoughts/:id
router
    .route('/:id')
    .get(findThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// POST a Reaction onto a Thought (/api/thoughts/:thoughtId/reactions)
router
    .route('/:thoughtId/reactions')
    .post(createReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;