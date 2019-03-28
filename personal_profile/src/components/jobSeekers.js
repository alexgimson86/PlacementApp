import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Table } from 'react-bootstrap'
import  StudentComponent  from './studentComponent';

export default class JobSeekers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mappedList: null,
            display: true,

        }
    }

    display = () => {
        let toDisplay = this.state.display;
        this.setState({
            display: !toDisplay,
        })
    }
    studentList = (student) => {
        return <StudentComponent key={student._id} studentInfo={student} />
    }
    componentDidMount() {

        axios.get('http://localhost:4000/student')
            .then(results => {

                let l = results.data.map((student) => {
                    return(this.studentList(student));

                })
                this.setState({
                    mappedList: l
                })
            }).catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <div>
                    <Table  bordered hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Introduction</th>
                                <th>More Details</th>
                            </tr>
                        </thead>
                    {this.state.mappedList ? this.state.mappedList : ""}
                    </Table>
            </div>

        )
    }
}
