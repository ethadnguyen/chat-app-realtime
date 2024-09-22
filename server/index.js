const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/connectDB');
const userRoutes = require('./routes/user.route');
const chatRoutes = require('./routes/chat.route');
const messageRoutes = require('./routes/message.route');
const app = express();


dotenv.config();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

const port = process.env.PORT || 5000;

connectDB();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});