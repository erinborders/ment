import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CareerList from './components/CareerList'
import Career from './components/Career'
import Mentor from './components/Mentor'
import Post from './components/Post'
import './App.css';

function App() {
  return (
    
      <div className="App">
        <Router>
        <div>
          <h1>MenT</h1>
          <div>
            <Link to="/">Careers</Link>
          </div>
        </div>

        <Switch>
          <Route exact path="/" component={CareerList} />
          <Route path="/careers/:id" component={Career} />
          <Route path="/mentors/:id" component={Mentor} />
          <Route path="/blogposts/:id" component={Post} />
        </Switch>
        </Router>
      </div>
    
  );
}

export default App;
