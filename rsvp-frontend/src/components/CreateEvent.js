import React, { useState } from 'react';
import axios from 'axios';

function CreateEvent() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [maxRSVPs, setMaxRSVPs] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:3001/event', { title, date, maxRSVPs });
            console.log(response);
            alert(`Event created! Share this link for RSVPs: /rsvp/${response.data._id}`);
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    return (
        <>
            <div className='container'>
                <h2 className='title'>Create a New Event</h2>
                <form className='inputs' onSubmit={handleSubmit}>
                    <input className='input'
                        type="text"
                        placeholder="Event Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input className='input'
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input className='input'
                        type="number"
                        placeholder="Max RSVPs"
                        value={maxRSVPs}
                        onChange={(e) => setMaxRSVPs(e.target.value)}
                    />
                    <button className='submit' type="submit">Create Event</button>
                </form>
            </div>

            <footer id='final'>

                <div id='footer_copyright'>
                    ©
                    2023 Desenvolvido por Felipe Sander
                </div>
            </footer>

        </>

    );
}

export default CreateEvent;
