const mongoose = require('mongoose');

const ridesSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: [true, 'Destination name is missing'],
        unique: true,
    },
    date: {
        type: String,
        required: [true, 'date is missing'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Username is missing'],
    },
    statusOpen: {
        type: Boolean,
        required: [true, 'statusOpen is missing'],
    },
});

const Rides = mongoose.model('rides', ridesSchema);

module.exports = {
    Rides,
};
