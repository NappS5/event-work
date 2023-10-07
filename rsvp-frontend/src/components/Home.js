import React from 'react';

function Home() {
    return (
        <>
        <div className='welcome-container'>
            <h1 className='welcome'>Welcome to the RSVP App</h1>
            <button className='newEvent' onClick={() => window.location.href="/create-event"}>Create New Event</button>
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

export default Home;
