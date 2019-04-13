import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PDFUrl: null,
            numPages: null,
            pageNumber: 1,
        }
    }
    componentDidMount(){
        var link = sessionStorage.getItem('jobApplicantResume')
        this.setState({
            PDFUrl:  link
        })
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
      }
    render() {
              return (
                <div>
                  Profile page
                </div>
              );
            }
          }
        /*return (
             this.state.url ? <PDF name={this.props.studentInfo.firstName} url={this.state.url}/> : null 
        ) */

