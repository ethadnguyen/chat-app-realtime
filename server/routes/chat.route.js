const express = require('express');
const { createChat, getUserChats, getChat } = require('../controllers/chat.controller');
const router = express.Router();

router.post('/', createChat);
router.get('/:userId', getUserChats);
router.get('/:firstId/:secondId', getChat);

module.exports = router;
