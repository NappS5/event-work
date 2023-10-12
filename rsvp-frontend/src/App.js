import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import Home from './components/Home';
import CreateEvent from './components/CreateEvent';
import RSVP from './components/RSVP';




function App() {
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

