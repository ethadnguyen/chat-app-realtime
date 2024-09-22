const express = require('express');
const { register, login, getUser, getUsers } = require('../controllers/user.controller');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getUsers)
router.get('/:userId', getUser);

module.exports = router;