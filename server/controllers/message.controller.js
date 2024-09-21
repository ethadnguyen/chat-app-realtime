const Message = require('../models/message.model');

const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;
    try {
        const message = new Message({ chatId, senderId, text });

        const response = await message.save();

        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await Message.find({ chatId });

        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createMessage, getMessages };