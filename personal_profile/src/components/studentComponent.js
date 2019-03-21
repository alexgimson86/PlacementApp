import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
//import DisplayStudent from './displayStudent';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Table } from 'react-bootstrap'
import ModalFunc from './modalFunc'

export default class StudentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentData: null,
            display: false,

        }
    }
    handleClick = () => {
        this.setState( state => {
            return {display: !state.display}
        })


    }
    constructStudent = (student) => {
        let imgU = "http://localhost:4000/" + student.imageUrl;
        let URL = `/studentModule/${student._id}`;
        return (

            <tr key={student._id}>
                <td key="image"><img src={imgU} className="img-thumbnail float-left" alt="no pic"></img>
                </td>
                <td key="fNameLname">{student.firstName}{student.lastName}</td>
                <td key="title">{student.title}
                </td>
                <td>
                    <Link to={URL} onClick={this.handleClick}>
                        click to see full report
                </Link>
                </td> 
                </tr>
        )
    }
    componentDidMount() {
                let data = this.constructStudent(this.props.studentInfo) 
                this.setState({
                    studentData: data
                })
    }
    render() {
        return (
            <div>
                <Router>
                    <Table responsive>
                        <tbody>
                            {this.state.studentData ? this.state.studentData : ""}
                        </tbody>
                    </Table>
                    <div>
                        <Route exact path='/studentModule/:id' render={()=><ModalFunc studentInfo={this.props.studentInfo} display={this.state.display} handleClick={this.handleClick}/>}/>
                    </div>
                </Router>
            </div>

        )
    }
}
