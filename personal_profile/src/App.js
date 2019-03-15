import React, { Component } from 'react';
import logo from './logo.svg';
import PersonalInfo from './components/personalInfo'
import JobSeekers from './components/jobSeekers'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       
        <JobSeekers/>
      </div>
    );
  }
}
export default App;