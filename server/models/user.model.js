const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        minLength: [3, 'Name cannot be less than 3 characters'],
        maxLength: [200, 'Name cannot be more than 200 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        minLength: [3, 'Email cannot be less than 6 characters'],
        maxLength: [200, 'Email cannot be more than 200 characters'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minLength: [6, 'Password cannot be less than 6 characters'],
        maxLength: [200, 'Password cannot be more than 200 characters']
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;