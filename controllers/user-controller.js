const { User, Thought } = require('../models');

const userController = {
    // Find All Users
    findAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({
                _id: -1
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Find User By Id
    findUserById({ params }, res) {
        User.findOne({
                _id: params.id
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            }).then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'Invalid id'
                    });
                    return;
                }
                res.json(dbUserData);
            }).catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Create New User
    createNewUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // Update A User By The Id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Invalid ID!' })
                    return;
                }
                res.json(dbUserData);
            }).catch(err => res.json(err));
        },

    // Delete A User
    deleteUser({ params }, res) {
        User.findOneAndDelete({
                _id: params.id
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = userController