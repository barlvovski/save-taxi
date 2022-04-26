const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, 'User name is missing'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email address is missing'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is missing'],
    },
    fullName: {
        type: String,
        required: [true, 'Full name is missing'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is missing'],
    },
    type: {
        type: String,
        required: [true, 'User type is missing'],
    },
});

const Users = mongoose.model('users', userSchema);

module.exports = {
    Users,
};
