const { Rides } = require('../models/rides');

async function createRide(req, res) {
    try {
        const newRide = await Rides.create({ ...req.body, statusOpen: true });
        await res.status(201).json(newRide);
    } catch (err) {
        await res.status(500).json({
            message: err.message,
        });
    }
}

async function getOpenRides(_req, res) {
    try {
        const rides = await Rides.find({ statusOpen: true });
        await res.status(200).json(rides);
    } catch (err) {
        await res.status(500).json({
            message: err.message,
        });
    }
}

module.exports = {
    createRide,
    getOpenRides,
};
