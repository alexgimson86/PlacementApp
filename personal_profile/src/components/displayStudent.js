import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import { Router, Route, Switch, Link } from 'react-router'
 
// using CommonJS modules
var Router = require('react-router').Router
var Route = require('react-router').Route
var Switch = require('react-router').Switch

export default class JobSeekers extends Component {
    constructor(props) {
        super(props);
       
    }
    componentDidMount() {

        axios.get('http://localhost:4000/student')
            .then(results => {
                
               
            }).catch(err => {

            })
    }
    render() {
        let st = {
            'textAlign': 'left'
        }
        return (
            <div className="container">
                {this.state.mappedList ? this.state.mappedList : ""}
            </div>
        )
    }
}
