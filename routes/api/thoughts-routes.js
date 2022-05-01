const router = require('express').Router();

const {
    getAllThought,
    findThoughtById,
    createThought,
    updateThought,
    deleteThought
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

module.exports = router;