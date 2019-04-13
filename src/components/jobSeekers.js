import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Table, Button, Container, ButtonToolbar, Tabs, Tab, Nav, Row, Col } from 'react-bootstrap'
import StudentComponent from './studentComponent';

export default class JobSeekers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mappedList: null,
            display: true,
            redirect: null,
            username: null,

        }
    }
    handleLogout = () => {
        axios.get('http://localhost:4000/logout',
            { withCredentials: true }
        ).then(results => {
            this.setState({ redirect: '/' })
        }).catch(err => {
            console.log(err);
        })
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
        axios.get('http://localhost:4000/student',
            { withCredentials: true }
        ).then(results => {
            let l = results.data.map((student) => {
                return (this.studentList(student));
            })
            this.setState({
                mappedList: l
            })
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }
        return (
            <Container>
                <Row>
                    <Col>
                        <Nav.Link className="justify-content-start" onClick={this.handleLogout}>
                            LOG OUT
                    </Nav.Link>
                    </Col>
                    <Col>
                        <Nav.Link className="justify-content-end" onClick={this.goToProfile}eventKey="link-1">                    {this.props.match.params.username}
                        </Nav.Link>
                    </Col>
                </Row>
                <br />
                <Container>
                    <Table hover responsive>
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
                </Container>
            </Container>

        )
    }
}
