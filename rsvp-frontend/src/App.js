import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import CreateEvent from './components/CreateEvent';
import RSVP from './components/RSVP';

import { useParams } from 'react-router-dom';

function EventPage() {
  const { eventId } = useParams();
  // Fetch and display event details based on eventId
}


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create-event" component={CreateEvent} />
          <Route path="/rsvp/:id" component={RSVP} />
          <Route path="/event/:eventId" component={EventPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

