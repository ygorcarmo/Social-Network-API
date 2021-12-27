const router = require('express').Router();
const { createUser } = require('../../controllers/userController');

// api/users (create and get)
router.route('/').post(createUser);

module.exports = router;
