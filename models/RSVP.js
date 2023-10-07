const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    attendeeName: { type: String, required: true }
});

module.exports = mongoose.model('RSVP', rsvpSchema);
