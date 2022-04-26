const mongoose = require('mongoose');

const chatsSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: [true, 'chatId is missing'],
        unique: true,
    },
    username1: {
        type: String,
        required: [true, 'username1 is missing'],
    },
    username2: {
        type: String,
        required: [true, 'username2 is missing'],
    },
    messages: {
        type: Array,
        default: [],
    },
});

const Chats = mongoose.model('chats', chatsSchema);

module.exports = {
    Chats,
};
