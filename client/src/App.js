import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CareerList from './components/CareerList'
import Career from './components/Career'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <h1>MenT</h1>
          <div>
            <Link to="/">Careers</Link>
          </div>
        </div>

        <Switch>
          <Route exact path="/" component={CareerList} />
          <Route path="/careers/:id" component={Career} />
        </Switch>
     
      </div>
    </Router>
  );
}

export default App;
