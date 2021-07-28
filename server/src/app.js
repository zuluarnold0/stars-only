//packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');

//database connection
//const connectDB = require('./db/mongoose');
//connectDB();

//middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

//routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const chatRouter = require('./routes/chat');
const profileRouter = require('./routes/profile');
const conversationRouter = require('./routes/conversation');

app.use(authRouter);
app.use(userRouter);
app.use(postRouter);
app.use(chatRouter);
app.use(profileRouter);
app.use(conversationRouter);

module.exports = app;