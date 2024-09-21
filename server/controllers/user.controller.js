const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const validator = require('validator');
const createToken = require('../utils');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'Người dùng đã tồn tại' });
        }

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Vui lòng điền đây đủ thông tin' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Email không hợp lệ' });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: 'Hãy nhập mật khẩu mạnh hơn' });
        }

        user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = createToken(user._id);

        res.status(201).json({ _id: user._id, name, email, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!email || !password) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
        }

        if (!user) {
            return res.status(400).json({ message: 'Người dùng không tồn tại' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không hợp lệ' });
        }

        await user.save();

        const token = createToken(user._id);

        res.status(201).json({ _id: user._id, name: user.name, email, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const getUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    register,
    login,
    getUsers,
    getUser,
};