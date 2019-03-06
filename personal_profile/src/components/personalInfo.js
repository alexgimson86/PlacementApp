import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import { axios } from 'axios';
class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            state: '',
            address: '',
            zip: '',
            personalWebsite: ''

        }
    }
    handleChange = (event) => {
        if (event.target.id === 'fName')
            this.setState({ firstName: event.target.value });

        if (event.target.id === 'lName')
            this.setState({ lastName: event.target.value });

        if (event.target.id === 'email')
            this.setState({ email: event.target.value });

        if (event.target.id === 'phone')
            this.setState({ phone: event.target.value });

        if (event.target.id === 'address')
            this.setState({ address: event.target.value });

        if (event.target.id === 'zip')
            this.setState({ zip: event.target.value });
            
        if (event.target.id === 'personalWebsite')
            this.setState({ personalWebsite: event.target.value });
    }
    handleSubmit = (event) => {
        axios.post('http://localhost/4000/personalInfo', 
        {
            firstName : this.state.firstName,
            lastName  :this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            state: this.state.state,
            address: this.state.address,
            zipCode: this.state.zipCode,
            mailingAddress: this.state.mailingAddress,
            personalWebsite: this.state.personalWebsite
        })
            .then(response => {
                console.log("in then")
            })
            .catch(err => {
                console.log(err)
            });
    }
    stateDropdown = () => {
        let state =
            (<select onChange={this.handleChange}>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option selected value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>)
        return state;
    }
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h2>
                        Resume Information
                    </h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nameInput">First Name</label>
                        <input type="text" onChange={this.handleChange} value={this.state.firstName} className="form-control" id="fName" aria-describedby="FirstName" placeholder="Enter First Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" onChange={this.handleChange} value={this.state.lastName} className="form-control" id="lName" placeholder="Enter Last Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" onChange={this.handleChange} value={this.state.email} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" onChange={this.handleChange} value={this.state.phone} className="form-control" id="phone" aria-describedby="phone number" placeholder="Enter Phone Number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Address">Address</label>
                        <input type="text" onChange={this.handleChange} value={this.state.address} className="form-control" id="address" placeholder="Enter Street Address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Enter Zip Code ">Zip Code</label>
                        <input type="text" onChange={this.handleChange} value={this.state.zip} className="form-control" id="zip" placeholder="Enter Zip Code" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Personal Website">Personal Website</label>
                        <input type="text" onChange={this.handleChange} value={this.state.zip} className="form-control" id="personalWebsite" placeholder="github or personal website URL" />
                    </div>
                    <div className="form-group">
                        {this.stateDropdown()}
                    </div>
                    <button type="submit" value="Submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default PersonalInfo;
