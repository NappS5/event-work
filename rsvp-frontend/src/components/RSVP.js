import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RSVP({ match }) {
    const [event, setEvent] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3001/event/${match.params.id}`);
                setEvent(response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        fetchEvent();
    }, [match.params.id]);

    const handleRSVP = async () => {
        try {
            await axios.post(`http://127.0.0.1:3001/rsvp/${match.params.id}`, { attendeeName: name });
            alert('RSVP successful!');
            window.location.reload();
        } catch (error) {
            console.error("Error with RSVP:", error);
        }
    };

    if (!event) return <div>Loading...</div>;

    return (
        <div>
            <h2>RSVP to {event.title}</h2>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Available Slots: {event.maxRSVPs - event.currentRSVPs}</p>
            
            <input 
                type="text" 
                placeholder="Your Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <button onClick={handleRSVP}>RSVP</button>
        </div>
    );
}

export default RSVP;
