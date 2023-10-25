import React, { useState, useEffect } from 'react';
import axios from 'axios';


function CreateEvent() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [maxRSVPs, setMaxRSVPs] = useState('');
    const [response, setResponse] = useState(null); // Inicialmente, response é null



    // Estado para controlar a exibição da mensagem de confirmação
    const [showConfirmation, setShowConfirmation] = useState(false);
    // Estado para armazenar a mensagem de confirmação
    const [confirmationMessage, setConfirmationMessage] = useState('');
    // Estado para controlar se o evento foi criado com sucesso
    const [eventCreated, setEventCreated] = useState(false);


    // Estado para controlar se o texto deve ser clicável
    const [isTextClickable, setIsTextClickable] = useState(false);

    const [showClickToCopy, setShowClickToCopy] = useState(true);


    // Função para copiar o URL RSVP
    const copy_rsvp = (rsvpUrl) => {
        navigator.clipboard.writeText(rsvpUrl)
            .then(() => {
                alert('Copied Successfully!😊');
            })
            .catch((error) => {
                console.error('Error copying RSVP URL:', error);
                alert('An error occurred while copying the RSVP URL. Please try again.');
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://rsvp-app-backend.onrender.com/event', { title, date, maxRSVPs });

            // Atualize o estado para exibir a mensagem de confirmação
            setShowConfirmation(true);
            setConfirmationMessage(`Put the link into your search bar: https://rsvp-app-frontend.onrender.com/rsvp/${response.data._id}`);
            setEventCreated(true); // Atualize o estado para indicar que o evento foi criado com sucesso

            // Defina a resposta no estado
            setResponse(response);
            setIsTextClickable(true); // Tornar o texto clicável
        } catch (error) {
            console.error("Error creating the event:", error);
        }
        
    };



    const handleTextClick = () => {
        if (isTextClickable && response) {
            // Chame a função copy_rsvp com o URL RSVP apenas se o texto for clicável e a resposta existir
            copy_rsvp(`https://rsvp-app-frontend.onrender.com/rsvp/${response.data._id}`);
        }
    };

    const handleConfirmClick = () => {
        // Limpe os campos de entrada quando o botão "Confirm" for clicado
        setTitle('');
        setDate('');
        setMaxRSVPs('');

        // Oculte a mensagem de confirmação após o botão "Confirm" ser clicado
        setShowConfirmation(false);
        // Oculte o "Click to copy" após o botão "Confirm" ser clicado
        setShowClickToCopy(false);
        setEventCreated(false);
    };


    return (
        <>
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
                        onChange={(e) => {
                            const newValue = Math.max(0, parseInt(e.target.value, 10));
                            setMaxRSVPs(newValue);
                            }}
                    />
                    <button className='submit' type="submit">Create Event</button>

                    {showConfirmation && (
                        <div className='confirm'>
                            <p className='link-rsvp'
                                style={{ cursor: isTextClickable ? 'pointer' : 'default', textDecoration: isTextClickable ? 'underline' : 'none' }}
                                onClick={handleTextClick}
                            >
                                {`https://rsvp-app-frontend.onrender.com/rsvp/${response ? response.data._id : ''}`}
                            </p>

                            {eventCreated && (
                                <button className='confirm-button ' type="button" onClick={handleConfirmClick}>
                                    Confirm
                                </button>
                            )}
                        </div>
                    )}
                    {eventCreated && (
                        <p className={`click-copy ${showClickToCopy ? 'show-copy-text' : ''}`}>Click to copy</p>
                    )}
                </form>
            </div>
        </>
    );
}

export default CreateEvent;

