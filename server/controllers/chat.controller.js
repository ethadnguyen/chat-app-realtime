const Chat = require('./../models/chat.model');

const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;
    try {
        const chat = await Chat.findOne({
            members: {
                $all: [firstId, secondId]
            }
        })
        if (chat) return res.status(200).json(chat);

        const newChat = new Chat({
            members: [firstId, secondId]
        });

        const response = await newChat.save();

        res.status(201).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const getUserChats = async (req, res) => {
    const { userId } = req.params;
    try {
        const chats = await Chat.find({
            members: { $in: [userId] }
        });

        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const getChat = async (req, res) => {
    const { firstId, secondId } = req.params;
    try {
        const chat = await Chat.find({
            members: {
                $all: [firstId, secondId]
            }
        });

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createChat, getUserChats, getChat };