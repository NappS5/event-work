const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    maxRSVPs: { type: Number, required: true },
    currentRSVPs: { type: Number, default: 0 }
});

module.exports = mongoose.model('Event', eventSchema);
