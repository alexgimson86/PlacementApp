import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';

export default class Resume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resume: null

        }
    }
    handleChange = (event) => {
        this.setState({resume: event.target.files[0]})
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let form = new FormData();
        form.append('myFile', this.state.resume)
        axios.post('http://localhost:4000/resume/post', form)
        .then((result)=>{
            console.log(result)
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="file" name="myFile" onChange={this.handleChange} />
                </div>
                <div>
                    <button type="submit"   className="btn btn-primary">Submit Resume</button>
                </div>
                
            </form>
        )
    }
}
