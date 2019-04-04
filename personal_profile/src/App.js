import React, { Component } from 'react';
import JobSeekers from './components/jobSeekers'
import Login from './components/login'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/jobseekers" component={JobSeekers} />
          <Route exact path="/" component={Login} />
        </Router>
      </div>
    );
  }
}
export default App;