import React, { Component } from 'react';
import JobSeekers from './components/jobSeekers'
import Login from './components/login'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import personalInfo from './components/personalInfo'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/jobseekers/:username" component={JobSeekers} />
          <Route exact path="/" component={Login} />
        </Router>
      </div>
    );
  }
}
export default App;