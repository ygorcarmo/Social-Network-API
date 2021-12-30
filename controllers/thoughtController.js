const { User, Thought, Reaction } = require('../models');

module.exports = {
    // Get all thoughts
    getThought(req, res){
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a thought by ID
    getThoughtById(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        User.findOne({ username: req.body.username })
            .then((user) =>
                !user
                ? res.status(404).json({message: 'No user found with this username :('})
                : Thought.create(req.body)
            )
            .then((thought) => {
                res.json(thought);
                console.log(thought.username);
                User.findOneAndUpdate(
                    { username: thought.username },
                    { $addToSet: { thoughts: thought._id} },
                    { runValidators: true, new: true}).then((user) => console.log(user))
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },
    // Delete a thought
    deleteThought(req, res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought found with that ID :('})
                : Thought.deleteMany({ _id: { $in: thought.reactions}})                
            )
            .then((reactions) =>
            !reactions 
            ? res.status(400).json({message: 'Thought deleted but no reactions found'}) 
            : res.json({message: 'Thought and Reactions deleted!'}))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)});
    },
    //Update a Thought
    updateThought(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought found with this ID :('})
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // add a reaction to thought
    addReaction(req, res){
        console.log('You are adding a reaction!')
        console.log(req.body);
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought found with that ID :('})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove reaction from a thought
    removeReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id : req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought 
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that ID :('})
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};
