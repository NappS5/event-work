import React, { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import Home from './components/Home';
import CreateEvent from './components/CreateEvent';
import RSVP from './components/RSVP';




function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://rsvp-app-iket.onrender.com")
    .then((res) => res.json())
    .then((data) => setMessage(data.message));
  },[]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create-event" component={CreateEvent} />
          <Route path="/rsvp/:id" component={RSVP} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

