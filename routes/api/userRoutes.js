const router = require('express').Router();
const { 
    createUser,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// api/users (create and get)
router.route('/').get(getUsers).post(createUser);

// api/users/:userId
router.route('/:userId').get(getUserById).delete(deleteUser).put(updateUser);

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
