import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import DisplayStudent from './displayStudent';
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
                    let imgU = "http://localhost:4000/" + student.imageUrl;
                    let URL = `/displayStudent/${student._id}`;
                    return (
                        <Router key={student._id}>
                            <Link to={URL} className="list-group">
                                <table className="table table-light">
                                    <tbody>

                                        <tr>
                                            <td key="image">

                                                <img src={imgU} className="img-thumbnail float-left" alt="no pic"></img>
                                            </td>
                                            <td key="fNameLname">

                                                {student.firstName}  {student.lastName}
                                            </td>
                                            <td key="title">

                                                {student.title}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Link>
                            <Route  exact path='/displayStudent/:id' component={DisplayStudent} />
                        </Router>
                    )
                })
                this.setState({
                    mappedList: l
                })
            }).catch(err => {
                console.log(err);
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
