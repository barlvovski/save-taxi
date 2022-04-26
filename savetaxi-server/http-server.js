const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routers/login-router');
const ridesRoutes = require('./routers/rides-router');
const chatsRoutes = require('./routers/chats-router');

const mongo = config.get('mongo');
const app = express();

// allows us to send request from fe to server
app.use(cors());
// parse the body of the request (req.body)
app.use(express.json());
// parse the cookies of the request (req.cookies)
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/rides', ridesRoutes);
app.use('/chats', chatsRoutes);

(async function () {
    await mongoose.connect(mongo.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
})().catch((err) => console.log(err));

module.exports = app;
