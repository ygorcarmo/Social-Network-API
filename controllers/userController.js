const { User, Thought } = require('../models');

// Aggregate fuction to get the number friends
const friendsCount = async () =>
    User.aggregate()
    .count('friendCount')
    .then((numberOfFriends) => numberOfFriends);

module.exports = {
    // Create user
    createUser(req, res){
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Get all user
    getUsers(req, res){
        User.find()
            .then( async (users) => {
                const userObj = {
                    users,
                    friendsCount: await friendsCount(),
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Get User by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.studentId })
            .select('-__v')
            .then(async (user) => 
                !user 
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json({
                        user
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a user remove them form friends
    deleteUser(req, res){
        User.findOneAndRemove({_id: req.params.userId })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No such user exits'})
                    : Thought.findOneAndRemove(
                        { users: req.params.userId },
                        { $pull: { users: req.params.userId } },
                        { new: true }
                    )
            })
            .then((thought) => 
                !thought
                    ? res.status.json({
                        message: 'User deleted, but no thoughts found'
                    })
                    : res.json({ message: 'User successfully deleted'})
            )
            .catch((err) =>{
                console.log(err);
                res.status(500).json(err);
            });
    },

    // add a friend to an user
    addFriend(req, res){
        console.log('You are adding a friend');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.studentId },
            {$addToSet: {friends: params.friendId}},
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID :('})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Remove friend from an user
    removeFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID :('}
                        )
                    :   res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};
