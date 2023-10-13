const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Importe o pacote cors



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// ... (other requires)

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

// ... (after other requires)

const Event = require('./models/Event');
const RSVP = require('./models/RSVP');

app.use(express.json());

// POST endpoint to create a new event
app.post('/event', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET endpoint to retrieve event details by its unique ID
app.get('/event/:eventId', async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/event/:eventId/rsvps', async (req, res) => {
    try {
        const rsvps = await RSVP.find({eventId:req.params.eventId});
        if (!rsvps) return res.status(404).json({ message: 'RSVPs not found' });
        res.json(rsvps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// POST endpoint to RSVP to a specific event
app.post('/rsvp/:eventId', async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        if (event.currentRSVPs >= event.maxRSVPs) return res.status(400).json({ message: 'Event is full' });

        const rsvp = new RSVP({
            eventId: req.params.eventId,
            attendeeName: req.body.attendeeName
        });
        await rsvp.save();

        event.currentRSVPs += 1;
        await event.save();

        res.status(201).json(rsvp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ... (rest of the server code)

