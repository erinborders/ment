import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CareerList from './components/CareerList'
import Career from './components/Career'
import Mentor from './components/Mentor'
import Post from './components/Post'
import NewCareerForm from './components/NewCareerForm'
import YouthProgramForm from './components/YouthProgramForm'
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
          <Route path="/careers/new" component={NewCareerForm} />
          <Route path="/careers/:id" component={Career} />
          <Route path="" />
          <Route path="/mentors/:id" component={Mentor} />
          {/* <Route path="/blogposts/new" component={NewPostForm} /> */}
          <Route path="/blogposts/:id" component={Post} />
        </Switch>
        </Router>
      </div>
    
  );
}

export default App;
