import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

const list = (props, results) => {

    /*<ul className="list-group">
                        <li className="list-group-item"> Introduction: {results.data.title ? results.data.title : na}</li>
                        <li className="list-group-item"> First Name: {results.data.firstName ? results.data.firstName : na}
                        </li>
                        <li className="list-group-item">
                            Last Name:  {results.data.lastName ? results.data.lastName : na}
                        </li>
                        <li className="list-group-item">email: { results.data.email ? results.data.email: na }  </li>
                        <li className="list-group-item">{results.data.phone}</li>
                        <li className="list-group-item">{results.data.address.street}</li>
                        <li className="list-group-item">{results.data.address.city}</li>
                        <li className="list-group-item">{results.data.address.state}</li>
                    </ul>
                    */
}
export default class DisplayStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            studentData: [],
            show: true,
        }
    }
    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }
    list = ({ data }) => {
        let na = "N/A"
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div>
                                {data.firstName} <br/>
                                {data.lastName}
                            </div>
                            <div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            {data.title}
                        </p>
                        <ListGroup>
                            <ListGroupItem>
                                {data.address.street}
                            </ListGroupItem>
                            <ListGroupItem>
                                {data.address.state}, {data.address.zip}
                            </ListGroupItem>
                            <ListGroupItem>
                                {data.address.country}
                            </ListGroupItem>
                            <ListGroupItem>
                                {data.phone}
                            </ListGroupItem>
                        </ListGroup>

                            
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>)
    }
    componentDidMount() {
        this.setState({
            id: this.props.match.params.id
        })
        let url = `http://localhost:4000/student/${this.props.match.params.id}`
        axios.get(url)
            .then(results => {
                let na = 'N/A'
                let s = this.list(results);

                this.setState({
                    studentData: s
                })
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        let st = {
            'textAlign': 'left'
        }
        return (
            <div>
                {this.state.studentData ? this.state.studentData : ""}
            </div>
        )
    }
}
