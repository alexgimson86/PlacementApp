import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class JobSeekers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mappedList: null
        }
    }
    componentDidMount() {

        axios.get('http://localhost:4000/student')
            .then(results => {
                let l = results.data.map((student) => {
                    let imgU = "http://localhost:4000/" + student.imageUrl
                    return (
                        <Router>
                            <Link to="/displayStudent" key={student._id} className="list-group">
                                <a href="#" className="list-group-item list-group-item-action ">
                                    <table class="table table-light">
                                        <tr>
                                            <td>

                                                <img src={imgU} className="img-thumbnail float-left" alt="no pic"></img>
                                            </td>
                                            <td>

                                                {student.firstName}  {student.lastName}
                                            </td>
                                            <td>

                                                {student.title}
                                            </td>
                                        </tr>
                                    </table>
                                </a>
                            </Link>
                        </Router>
                            )
                })
                this.setState({
                    mappedList: l
                })
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
