const express = require('express');
const User = require('../models/user.model');
const { register, login, getUser, getUsers } = require('../controllers/user.controller');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getUsers)
router.get('/:userId', getUser);

module.exports = router;