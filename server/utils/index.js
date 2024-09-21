const jwt = require('jsonwebtoken');
// require('dotenv').config();

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = createToken;