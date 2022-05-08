const { Thought, User} = require('../models');

const thoughtController = {
    // Get All Thoughts
    getAllThought(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({
                _id: -1
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Finds One Thought by the id
    findThoughtById({ params }, res) {
        Thought.findOne({
                _id: params.id
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Create A Thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    // Update Thought By The Id
    updateThought({ params , body }, res) {
        Thought.findOneAndUpdate({
                _id: params.id
            }, body, {
                new: true,
                runValidators: true
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(400).json({
                        message: 'Invalid Id!'
                    });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
        },

    // Delete Thought by ID
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'Invalid ID!'});
                    return;
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.id }},
                    { new: true }
                )
            }).then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Invalid ID!'});
                    return;
                }
                res.json(dbUserData);
            }).catch(err => res.json(err));
        },

    createReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
        .populate({ path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Invalid ID!'});
                return;
            }
            res.json(dbThoughtData);
        }).catch(err => res.status(400).json(err))
    },
    
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } }},
            { new: true }
        ).then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Invalid ID!'});
                return;
            }
            res.json(dbThoughtData);
        }).catch(err => res.json(err));
    }
};

module.exports = thoughtController