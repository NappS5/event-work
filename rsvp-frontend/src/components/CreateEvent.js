

import React, { useState } from 'react';
import axios from 'axios';

function CreateEvent() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [maxRSVPs, setMaxRSVPs] = useState('');
    
    // Estado para controlar a exibição da mensagem de confirmação
    const [showConfirmation, setShowConfirmation] = useState(false);
    // Estado para armazenar a mensagem de confirmação
    const [confirmationMessage, setConfirmationMessage] = useState('');
    // Estado para controlar se o evento foi criado com sucesso
    const [eventCreated, setEventCreated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://a192-186-216-254-122.ngrok-free.app/event', { title, date, maxRSVPs });
            console.log(response);
            // Atualize o estado para exibir a mensagem de confirmação
            setShowConfirmation(true);
            setConfirmationMessage(`Success!! Share this link: /rsvp/${response.data._id}`);
            setEventCreated(true); // Atualize o estado para indicar que o evento foi criado com sucesso
        } catch (error) {
            console.error("Erro ao criar o evento:", error);
        }
    };

    return (
        <div className='container'>
            <h2 className='title'>Create a New Event</h2>
            <form className='inputs' onSubmit={handleSubmit}>

                <input className='input'
                    type="text" 
                    placeholder="Title of event" 
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
                    placeholder="Max of RSVPs" 
                    value={maxRSVPs} 
                    onChange={(e) => setMaxRSVPs(e.target.value)} 
                />
                <button className='submit' type="submit">Create Event</button>

                {showConfirmation && (
                    <div className='confirm'>
                        <p>{confirmationMessage}</p>
                        {eventCreated && (
                            <button className='confirm-button' type="button" onClick={() => { setShowConfirmation(false); }}>
                                Confirm
                            </button>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
}

export default CreateEvent;

