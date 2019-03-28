import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import PDF from './pdf';

export default class Resumes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null
        }
    }
    componentDidMount(){
        let url = `http://localhost:4000/resume/${this.props.studentInfo._id}`
        axios.get(url)
            .then(results => {
                let resultsUrl = `http://localhost:4000/${results.data}`

                this.setState({
                    url: resultsUrl
                })
            }).catch(err => {
                console.log(err)
            })
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
      }
    
    render() {
        return (
             this.state.url ? <PDF name={this.props.studentInfo.firstName} url={this.state.url}/> : null 
        ) 
    }
}
