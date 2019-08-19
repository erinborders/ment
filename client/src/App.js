import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CareerList from './components/CareerList'
import Career from './components/Career'
import Mentor from './components/Mentor'
import Post from './components/Post'
import NewCareerForm from './components/NewCareerForm'
import FindCentersForm from './components/FindCentersForm'
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Theme from './Theme'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'

function App() {
  return (
    
      <div className="App">
        <MuiThemeProvider theme={Theme}>
        <Router>
          <AppBar position="static">
            <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                <Link style={{textDecoration: 'none', color: 'white'}} to="/"><h1>MenT</h1></Link>
              <div className="job-center-link">
                <Link style={{textDecoration: 'none', color: 'white'}} to="/search">Job Centers Near You</Link>
              </div>
            </Toolbar>
          </AppBar>
        <Switch>
          <Route exact path="/" component={CareerList} />
          <Route path="/careers/new" component={NewCareerForm} />
          <Route path="/careers/:id" component={Career} />
          <Route path="/search" component={FindCentersForm} />
          <Route path="/mentors/:id" component={Mentor} />
          <Route path="/blogposts/:id" component={Post} />
        </Switch>
        </Router>
        </MuiThemeProvider>
      </div>
      
  );
}

export default App;
