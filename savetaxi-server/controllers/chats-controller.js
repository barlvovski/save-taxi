const { Rides } = require('../models/rides');
const { Chats } = require('../models/chats');

async function createChat(req, res) {
    try {
        const { id: rideId, requesterId } = req.body;
        const ride = await Rides.findById(rideId);
        const sortedUsernames = [ride.username, requesterId];
        const chatId = sortedUsernames[0] + '-' + sortedUsernames[1];

        const matchingChat = await Chats.find({ chatId });
        if (matchingChat.length === 0) {
            const newChat = await Chats.create({
                chatId,
                username1: ride.username,
                username2: requesterId,
            });
            newChat.save();
            await res.status(201).json(newChat);
        }
    } catch (err) {
        await res.status(500).json({
            message: err.message,
        });
    }
}

async function getUserChats(req, res) {
    try {
        const { userId } = req.params;
        const chats = await Chats.find({
            $or: [{ username1: userId }, { username2: userId }],
        });
        await res.status(200).json(chats);
    } catch (err) {
        await res.status(500).json({
            message: err.message,
        });
    }
}

async function sendMessage(req, res) {
    try {
        const { chatId, message, username } = req.body;
        const chat = await Chats.findOne({ chatId });
        chat.messages.push({ username, message });
        await chat.save();
        await res.status(201).json(chat);
    } catch (err) {
        await res.status(500).json({
            message: err.message,
        });
    }
}

async function getChatMessages(req, res) {
    try {
        const { chatId } = req.params;
        const chat = await Chats.findOne({ chatId });
        await res.status(200).json(chat.messages);
    } catch (err) {
        await res.status(500).json({
            message: err.message,
        });
    }
}

module.exports = {
    createChat,
    getUserChats,
    sendMessage,
    getChatMessages,
};
