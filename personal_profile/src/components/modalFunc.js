import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import JobSeekers from './jobSeekers';


const ModalFunc =( props) => {

       
        let na = "N/A"
        if (props.studentInfo)
       
            return (
                <Modal show={props.display} onHide={props.handleClick}>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>
                                <div>
                                    {props.studentInfo.firstName} <br />
                                    {props.studentInfo.lastName}
                                </div>
                                <div>
                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                {props.studentInfo.title}
                            </p>
                            <ListGroup>
                                <ListGroupItem>
                                    {props.studentInfo.address.street}
                                </ListGroupItem>
                                <ListGroupItem>
                                    {props.studentInfo.address.state}, {props.studentInfo.address.zip}
                                </ListGroupItem>
                                <ListGroupItem>
                                    {props.studentInfo.address.country}
                                </ListGroupItem>
                                <ListGroupItem>
                                    {props.studentInfo.phone}
                                </ListGroupItem>
                            </ListGroup>


                        </Modal.Body>

                        <Modal.Footer>
                            <Router>
                                <Link to="/">
                                    <Button variant="secondary" onClick={props.handleClick}>
                                        Close
                            </Button>
                                </Link>
                                <Route exact path="/" component={JobSeekers} />
                            </Router>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>)
    
}

export default ModalFunc