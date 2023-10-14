import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RSVP({ match }) {
    const [event, setEvent] = useState(null);
    const [name, setName] = useState('');
    const [participants, setParticipants] = useState([]);

    
   

    useEffect(() => {
        const fetchRSVPs = async () => {
            try {
                const response = await axios.get(`https://9e19-189-28-216-61.ngrok-free.app/event/${match.params.id}/rsvps`, {
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                setParticipants(response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        const fetchEvent = async () => {
            try {
                const response = await axios.get(`https://9e19-189-28-216-61.ngrok-free.app/event/${match.params.id}`, {
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                setEvent(response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        fetchRSVPs();

        fetchEvent();
    }, [match.params.id]);
    console.log(participants);
    const handleRSVP = async () => {
        try {
            await axios.post(`https://9e19-189-28-216-61.ngrok-free.app/rsvp/${match.params.id}`, { attendeeName: name });
            
            window.location.reload();
        } catch (error) {
            console.error("Error with RSVP:", error);
        }
    };

    if (!event) return <div>Loading...</div>;   

    return (
        <div className='rsvp-container'>
            <h2 id='title-rsvp'>RSVP to : <span className='subtitle'>{event.title}</span></h2>
            <div className='date-slots'>
            <p className='title-rsvp'>Date: <span className='subtitle-date'>{new Date(event.date).toLocaleDateString()}</span> /</p>
            <p className='title-rsvp'> Available Slots: <span className='subtitle-date'>{event.maxRSVPs - event.currentRSVPs}</span></p>
            </div>

            

            {event.currentRSVPs >= event.maxRSVPs ? (
                 <>
                 <p className='event-full'>Event is full</p>
             </>
         ) : (
                <>
                    <input className='input-rsvp'
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className='submit-rsvp' onClick={handleRSVP}>RSVP</button>
                </>
            )}
        <h3 className='list-participants'>List of Participants:</h3>
            <div className='participants-container'>
                 <p className='people-list'> These are the people that are Participating on your Event!
                     {participants.map((participant, index) => (
                        <div className='name-list'>
                            <span key={index}>{participant.attendeeName}</span><br/>
                        </div>
                     ))}
                 </p>
            </div>
        </div>
    );
}


export default RSVP;
