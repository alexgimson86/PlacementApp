import React, { Component } from 'react';
import { Form, Button, Container, Jumbotron } from 'react-bootstrap'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
} from "react-router-dom";
import JobSeekers from './jobSeekers';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: null,
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleClick = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:4000/student/login',
            data: {
                password: this.state.password,
                username: this.state.username,
            }
        })
            .then(response => {
                if(response.status === 200){
                    this.setState({
                        redirect: "/jobseekers",
                        userInfo: response.data
                    })
            }
            })
            .catch(err => {
                console.log(err)
            });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect}} />
        }
        else {
            return (
                <Container><br /> <br />
                    <Jumbotron>LOGIN PAGE</Jumbotron>
                    <Container>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.handleClick}>
                                Submit
                        </Button>
                        </Form>;
                </Container>
                </Container >
            );
        }
    }
}
export default Login;