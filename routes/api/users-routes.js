const router = require('express').Router();

const {
    findAllUsers,
    findUserById,
    createNewUser,
    updateUser,
    deleteUser,
    addfriend,
    deletefriend
} = require('../../controllers/user-controller');

// Setup GET all and POST in /api/users
router
    .route('/')
    .get(findAllUsers)
    .post(createNewUser);

// Setup GET one, PUT, and DELETE in /api/users/:id
router
    .route('/:id')
    .get(findUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(addfriend)
    .delete(deletefriend);

module.exports = router;